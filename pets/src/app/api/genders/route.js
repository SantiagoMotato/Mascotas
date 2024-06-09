import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(){
  const res = await prisma.gender.findMany();
  console.log(res)
  return new Response(JSON.stringify(res), {headers:{'Content-type':'application/json'}, status:200}); 
}
