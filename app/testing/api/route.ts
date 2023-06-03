import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const request = await req.json()
    const query = req.nextUrl.searchParams.get('query')
    return new Response(query)
}