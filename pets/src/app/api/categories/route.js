import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(){
  const res = await prisma.categories.findMany();
  console.log(res)
  return new Response(JSON.stringify(res), {headers:{'Content-type':'application/json'}, status:200}); 
}

export async function POST(request, response){

  const data = await request.json();
  const res = await prisma.categories.create({
    data: data
  });
  console.log(res)
  return new Response(JSON.stringify(res), {headers:{'Content-type':'application/json'}, status:200}); 
}

