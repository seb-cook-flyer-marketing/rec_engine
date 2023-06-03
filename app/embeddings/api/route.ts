import { NextRequest } from "next/server";
import { embeddingsResponse, generateTextFromProducts } from "@/app/scripts/generateEmbeddings";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {

    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

    const products = generateTextFromProducts() as any[];

    products.map(async (product) => {
        await embeddingsResponse(product.content).then(async (response) => {
            console.log("product", product)
            await supabaseClient.from("products").insert({
                url: product.url,
                content: product.content,
                token_count: response.data.usage.total_tokens,
                embedding: response.data.data[0].embedding,
                image: product.image,
                title: product.title,
                subtitle: product.subtitle,
                description: product.description,
                category: product.category,
                subcategory: product.subcategory,
                price: product.price,
                gender: product.gender
            }).then((response) => console.log(response));
        }).catch((error) => console.log(error));
    });
}