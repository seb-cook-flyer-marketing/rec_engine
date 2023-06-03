import { OpenAIApi, Configuration } from "openai"
import products from "../data/trending.json";

type Product = {
    Title: string;
    Subtitle: string;
    Description: string;
    Category: string;
    Subcategory: string;
    Price: number;
    Url: string;
    Gender: string;
    Image: string;
    Colour: string;
    content: string;
}
const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const productsList = products as Product[];

export const generateTextFromProducts = (): Product[] => {
    let textArray = [] as any[];
    productsList.map((product) => {
        const input = `${product.Title} ${product.Subtitle} ${product.Description} ${product.Gender} ${product.Category} ${product.Subcategory}`;
        textArray.push({
            content: input,
            url: product.Url,
            token_count: 0,
            embedding: null,
            image: product.Image,
            title: product.Title,
            subtitle: product.Subtitle,
            description: product.Description,
            category: product.Category,
            subcategory: product.Subcategory,
            price: product.Price,
            gender: product.Gender
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