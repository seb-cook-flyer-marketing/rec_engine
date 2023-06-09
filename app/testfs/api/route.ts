import { NextRequest } from "next/server";
import { readFile, readFileSync, readSync, writeFile, writeFileSync } from "fs";

const filePath =
  "/Users/sebastiancook/www/rec engine/rec-engine/data/temp.json";

export async function POST(req: NextRequest) {
  let data = JSON.parse(readFileSync(filePath, "utf8")) as any[];
  //let input = req.body;
  //data.push(input);

  const input = await req.json();

  console.log(input);

  data.push(input);

  writeFileSync(filePath, JSON.stringify(data));

  const updatedData = readFileSync(filePath, "utf8");
  return new Response(updatedData);
}
