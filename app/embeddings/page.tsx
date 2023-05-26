import { generateTextFromProducts } from "@/app/scripts/generateEmbeddings";
export default function Page() {
    const products = generateTextFromProducts();
    products
    return <p>Hello</p>;
}