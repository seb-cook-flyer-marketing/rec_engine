import { createClient } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link";

//export const revalidate = 0;
export default async function Page({ params, searchParams }: { params: { id: string }, searchParams?: { [key: string]: string | string[] | undefined } }) {
    const supabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )
    console.log(params)
    const { data, error } = await supabaseClient.from("products").select("*").eq("id", Number(params.id)).single() as any

    const { data: recommendations, error: recError } = await supabaseClient.rpc("match_products", {
        embedding: data.embedding,
        match_threshold: 0.78,
        match_count: 5,
        min_content_length: 50
    })

    console.log(data)
    console.log("recommonedations", recommendations)
    return (
        <div>
            {
                data && <div className="hero min-h-fit bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <Image src={data.image} className="max-w-sm rounded-lg shadow-2xl" width="300" height="300" alt="some product" />
                        <div>
                            <h1 className="text-5xl font-bold">{data.title}</h1>
                            <p className="py-6">{data.description}</p>
                        </div>
                    </div>
                </div>
            }
            <h2 className="text-3xl font-bold p-3">Similar Items</h2>
            <div className="carousel carousel-center max-w-full p-4 space-x-4 rounded-box">
                {recommendations && recommendations.map((product: any) => {
                    return (
                        <Link href={`/${product.id}`}>
                            <div className="carousel-item scroll-smooth">
                                <div className="card w-96" key={product.id}>
                                    <figure><Image className="rounded" src={product.image} alt={product.id} width="100" height="100" loading="eager" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{product.title}</h2>
                                        <div className="flex">
                                            <p className="font-bold">Similarity</p>
                                            <p>{product.similarity}</p>
                                        </div>
                                        <p className="overflow-hidden h-12 text-ellipsis">{product.description}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}  