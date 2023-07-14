import { NextRequest } from "next/server";
import { corsHeaders } from "../../query/api/route";
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

const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const primarkShoppingAssistant = oneLine`
You are a very enthusiastic Primark shopping assistant who loves to help people! 
Given the following information from 
the Primark products catalogue, answer the user's question using 
only that information and return the answer in a very enthusiastic manner.`;

async function get_product_recommendations(query: string) {
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

  return products;
}

async function run_conversation({ query }: { query: string }) {
  console.log(query);
  const baseURL = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openAiKey}`,
  };

  let messages: ChatCompletionRequestMessage[] = [
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: query,
    },
  ];

  const completionOptions: CreateChatCompletionRequest = {
    model: "gpt-3.5-turbo-0613",
    messages: messages,
    max_tokens: 4000,
    temperature: 0,
    functions: [
      {
        name: "get_product_recommendations",
        description: "Get product recommendation based on user query",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The users query",
            },
          },
          required: ["query"],
        },
      },
    ],
    function_call: "auto",
  };

  try {
    let response = (await fetch(baseURL, {
      method: "POST",
      headers,
      body: JSON.stringify(completionOptions),
    })) as any;

    response = await response.json();

    console.log(response);

    let executedFunctions = {} as any;
    while (
      response.choices[0].message.function_call &&
      response.choices[0].finish_reason !== "stop"
    ) {
      let message = response.choices[0].message;
      const function_name = message.function_call.name;
      if (executedFunctions[function_name]) {
        break;
      }
      let function_response = "";
      switch (function_name) {
        case "get_product_recommendations":
          let recommendationArgs = JSON.parse(message.function_call.arguments);
          function_response = await get_product_recommendations(
            recommendationArgs.query
          );
          break;
        default:
          throw new Error(`Unsupported function: ${function_name}`);
      }
      executedFunctions[function_name] = true;

      completionOptions.messages.push({
        role: "function",
        name: function_name,
        content: function_response,
      });

      console.log(completionOptions);

      response = await fetch(baseURL, {
        method: "POST",
        headers,
        body: JSON.stringify({ stream: false, ...completionOptions }),
      })
        .then(async (res) => {
          res = await res.json();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      return completionOptions.messages;
    }
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") as string;

  return run_conversation({ query: query })
    .then((response: any) => {
      console.log(response);
      return new Response(JSON.stringify(response), {
        ...corsHeaders,
        headers: { "Content-Type": "application/json" },
      });
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
} 
