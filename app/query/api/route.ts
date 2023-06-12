import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { codeBlock, oneLine } from "common-tags";
import GPT3Tokenizer from "gpt3-tokenizer";
import {
  CreateChatCompletionRequest,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  ChatCompletionRequestMessage,
  OpenAIApi,
} from "openai";
import { ApplicationError, UserError } from "../../../lib/errors";

// OpenAIApi does currently not work in Vercel Edge Functions as it uses Axios under the hood.
// Axios does not work in Vercel Edge Functions as it uses Node.js 12.x.

const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export async function GET(req: NextRequest) {
  try {
    if (!openAiKey) {
      throw new ApplicationError("Missing environment variable OPENAI_KEY");
    }

    if (!supabaseUrl) {
      throw new ApplicationError("Missing environment variable SUPABASE_URL");
    }

    if (!supabaseServiceKey) {
      throw new ApplicationError(
        "Missing environment variable SUPABASE_SERVICE_ROLE_KEY"
      );
    }

    if (!req) {
      throw new UserError("Missing request data");
    }

    const query = req.nextUrl.searchParams.get("query");

    if (!query) {
      throw new UserError("Missing query in request data");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    // Moderate the content to comply with OpenAI T&C
    const sanitizedQuery = query.trim();
    const configuration = new Configuration({ apiKey: openAiKey });
    const openai = new OpenAIApi(configuration);

    const moderationResponse = await openai.createModeration({
      input: sanitizedQuery,
    });

    const [results] = moderationResponse.data.results;

    if (results.flagged) {
      throw new UserError("Flagged content", {
        flagged: true,
        categories: results.categories,
      });
    }

    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: sanitizedQuery.replaceAll("\n", " "),
    });

    if (embeddingResponse.status !== 200) {
      throw new ApplicationError(
        "Failed to create embedding for question",
        embeddingResponse
      );
    }

    const [{ embedding }] = embeddingResponse.data.data;

    console.log(embedding);

    const { error: matchError, data: products } = await supabaseClient.rpc(
      "match_products",
      {
        embedding,
        match_threshold: 0.7,
        match_count: 10,
        min_content_length: 50,
      }
    );

    if (matchError) {
      throw new ApplicationError("Failed to match product", matchError);
    }

    const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
    let tokenCount = 0;
    let contextText = "";

    console.log(products);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const content =
        "title: " +
        product.title +
        ", description: " +
        product.description +
        ", url: " +
        product.url +
        ", image: " +
        product.image;
      const encoded = tokenizer.encode(content);
      tokenCount += encoded.text.length;

      console.log(tokenCount);

      if (tokenCount >= 1000) {
        break;
      }

      contextText += `{ ${content.trim()}},`;
    }

    console.log(contextText);

    const sleazyCarSalesman = oneLine`
        You are a sleazy secondhand car salesman, 
        try your hardest to sell me the follow products from the Primark products catalogue, 
        answer the user's question using only that information as a sleazy car salesman would.`;

    const primarkShoppingAssistant = oneLine`
        You are a very enthusiastic Primark shopping assistant who loves to help people! 
        Given the following information from 
        the Primark products catalogue, answer the user's question using 
        only that information and return the answer in a very enthusiastic manner.`;

    const Yoda = oneLine`
        You are Yoda, the wise Jedi master. Given the following information from
        the Primark products catalogue, answer the user's question using
        only that information using the tone, manner, and vocabulary Yoda would use.`;

    const BartSimpson = oneLine`
        I want you to act like Bart Simpson. Given the following information from
        the Primark products catalogue, answer the user's question using
        only that information using the tone, manner and vocabulary Bart would use.`;

    const RuPaul = oneLine`
        You are RuPaul, the famous drag queen. Given the following information from
        the Primark products catalogue, answer the user's question using
        only that information using the tone, manner and vocabulary and be as Flamboyant as RuPaul.`;

    const messages: ChatCompletionRequestMessage[] = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: codeBlock`
                ${primarkShoppingAssistant}
      
                ${oneLine`
                  If you are unsure
                  and the answer is not explicitly available on the Primark website, say
                  "Sorry, I don't know how to help with that."
                `}

                ${oneLine`    
            - return recommended products in an ordered list in the following format: 
            1. product 1 include product title in the following format: # product title, 
            include product image in the following format: ![product image]("Product Image"), 
            include product description, include product url in the following format: [product title](product url) 
            - Output as markdown
                `}
              `,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: codeBlock`
            ${[contextText]}
          `,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: codeBlock`
            ${oneLine`
              Answer my next question using only the above products.
              You must also follow the below rules when answering:
            `}
            ${oneLine`
            - Do not make up answers that are not provided by Primark.
            `}
            ${oneLine`
            - If you are unsure and the answer is not explicitly written
              in the product context, say
              "Sorry, I don't know how to help with that."
            `}

            ${oneLine`    
            - return the products you recommend in an ordered list
                `}

            ${oneLine`    
            - return recommended products as a list item in the following format and in this ordered: 
            1. product 1 include product image in the following format: ![product image]("product title"),
            include product title, 
            include product description,
            include product url in the following format: [product title](product url)
            - Output as markdown
                `}
          `,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: codeBlock`
            ${oneLine`${sanitizedQuery}`}
        `,
      },
    ];

    const completionOptions: CreateChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 1024,
      temperature: 0,
      stream: true,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completionOptions),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApplicationError("Failed to generate completion", error);
    }

    // Proxy the streamed SSE response from OpenAI
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
      },
    });
  } catch (err: unknown) {
    if (err instanceof UserError) {
      return new Response(
        JSON.stringify({
          error: err.message,
          data: err.data,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else if (err instanceof ApplicationError) {
      // Print out application errors with their additional data
      console.error(`${err.message}: ${JSON.stringify(err.data)}`);
    } else {
      // Print out unexpected errors as is to help with debugging
      console.error(err);
    }

    // TODO: include more response info in debug environments
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
