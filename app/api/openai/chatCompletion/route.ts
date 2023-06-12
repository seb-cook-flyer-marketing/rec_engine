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

import { ApplicationError, UserError } from "../../../../lib/errors";

const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const retrieveMessages = ({
  contextText,
  systemPersona,
  sanitizedQuery,
}: {
  contextText: string;
  systemPersona: string;
  sanitizedQuery: string;
}): ChatCompletionRequestMessage[] => {
  return [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: codeBlock`
              ${systemPersona}
    
              ${oneLine`
                If you are unsure and the answer is not explicitly 
                available on the Primark website, say
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
          Here are the Primark products:
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
          - Do not make up answers that are not provided by Primark products above.
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
          Here is my question:
          ${oneLine`${sanitizedQuery}`}
      `,
    },
  ];
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

import type { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
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
    const reqBody = await req.json();

    const messages = reqBody.message;

    if (!messages) {
      throw new UserError("Missing message in request data");
    }

    const sanitizedQuery = messages.content.trim();
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

    const { error: matchError, data: products } = await supabaseClient.rpc(
      "match_products",
      {
        embedding,
        match_threshold: 0.7,
        match_count: 10,
        min_content_length: 50,
      }
    );

    return new Response(JSON.stringify([...messages]));
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
