"use client";
import Carousel from "../components/carousel";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 0;

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

  const { data } = await supabaseClient
    .from("products")
    .select("*")
    .range(0, 10);

  return <Carousel values={data} />;
}
