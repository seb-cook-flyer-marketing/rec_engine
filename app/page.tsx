import Image from 'next/image'
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

//export const revalidate = 0;

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabaseClient.from("products").select("*");
  return (

    <div className="carousel carousel-center max-w-full p-4 space-x-4 rounded-box">
      {data && data.map((product: any) => {
        return (
          <Link href={`/${product.id}`}>
            <div className="carousel-item scroll-smooth">
              <div className="card w-96" key={product.id}>
                <figure><Image className="rounded w-full max-h-[29rem]" src={product.image} alt={product.id} width="300" height="300" loading="eager" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p className="overflow-hidden h-12 text-ellipsis">{product.description}</p>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>

  )
}
