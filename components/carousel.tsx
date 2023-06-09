"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default function Carousel({ values }: { values: any }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  const [products, setProducts] = useState<any[]>(values);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [from, setFrom] = useState<number>(11);
  const [to, setTo] = useState<number>(21);
  const [total, setTotal] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const fetchMoreProducts = async () =>
    await supabaseClient
      .from("products")
      .select("*")
      .range(from, to)
      .then(({ data, error, count }) => {
        error && setError(error.message);
        count && setTotal(count);
        if (data) {
          setProducts((prevState) => [...prevState, ...data]);
          setFrom((prevState) => prevState + 10);
          setTo((prevState) => prevState + 10);
        }
      });

  const handleLoadMore = async () => {
    if (carouselRef.current && carouselRef.current.scrollWidth !== 0) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const isScrollEnd = scrollWidth - clientWidth - scrollLeft;
      if (isScrollEnd === 0) {
        await fetchMoreProducts();
      }
    }
  };

  return (
    <div
      className="carousel carousel-center max-w-full p-4 space-x-4 rounded-box"
      ref={carouselRef}
      onScroll={(e) => {
        handleLoadMore();
      }}
    >
      <div className="absolute flex justify-between z-[1000] translate-y-56">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (carouselRef.current) {
              carouselRef.current.scrollLeft -= 300;
            }
          }}
          className="btn btn-circle btn-primary"
        >
          ❮
        </button>
      </div>
      <div className="absolute flex w-full justify-end align-bottom z-[999] translate-y-56 -translate-x-10">
        <button
          className="btn btn-circle btn-primary"
          onClick={(e) => {
            if (carouselRef.current) {
              carouselRef.current.scrollLeft += 300;
            }
          }}
        >
          ❯
        </button>
      </div>
      {products &&
        products.map((product: any) => {
          return (
            <Link href={`/${product.id}`} key={product.id}>
              <div className="carousel-item scroll-smooth">
                <div className="card w-96">
                  <figure>
                    <Image
                      className="rounded w-full max-h-[29rem]"
                      src={product.image}
                      alt={product.id}
                      width="300"
                      height="300"
                      loading="eager"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <p className="overflow-hidden h-12 text-ellipsis">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
