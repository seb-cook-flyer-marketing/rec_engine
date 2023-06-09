import { OpenAIApi, Configuration } from "openai";
import products from "../data/bags.json";

type Product = {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  url: string;
  gender: string;
  image: string;
  content: string;
  colors: string[];
};
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateTextFromProducts = (): Product[] => {
  let textArray = [] as any[];
  products.map((product) => {
    const input = `${product.title} ${product.subtitle} ${
      product.description
    } ${product.gender} ${product.category} ${product.subcategory} ${
      product.price
    } ${product.colors.join(" ")}`;
    textArray.push({
      content: input,
      url: product.url,
      token_count: 0,
      embedding: null,
      image: product.image,
      title: product.title,
      subtitle: product.subtitle,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      gender: product.gender,
      colors: product.colors,
    });
  });

  return textArray;
};

export const embeddingsResponse = async (input: string) => {
  return await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: input,
  });
};
