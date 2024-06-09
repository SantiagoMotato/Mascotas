import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
    const res = await prisma.races.findMany();
    return new Response(JSON.stringify(res), {headers:{'Content-Type':"application/json"}, status:200})
}