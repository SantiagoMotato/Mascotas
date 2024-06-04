import { PrismaClient } from "@prisma/client";
// import { headers } from "next/headers";

const prisma = new PrismaClient()

export async function GET(){
    const res = await prisma.users.findMany();
    console.log(res)
    return new Response(JSON.stringify(res), {headers:{'Content-type':'application/json'}, status:200}); 
}

export function POST(){
    return new Response("Creating")
}
