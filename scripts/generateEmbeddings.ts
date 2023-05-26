import { OpenAIApi, Configuration } from "openai"
import products from "../data/products.json";

type Product = {
    Title: string,
    Subtitle: string,
    Description: string,
    Price: number,
    Link: string,
}
const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const productsList = products as Product[];

export const generateTextFromProducts = () => {
    let textArray = [] as any[];
    productsList.map((product) => {
        const input = `${product.Title} ${product.Subtitle} ${product.Description} ${product.Price} ${product.Link}`;
        console.log(input);
        textArray.push({
            content: input,
            url: product.Link,
            token_count: 0,
            embedding: null,
        });
    })

    return textArray
}

export const embeddingsResponse = async (input: string) => {
    return await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: input
    })
}