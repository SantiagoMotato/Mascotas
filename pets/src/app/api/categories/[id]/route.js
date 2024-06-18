import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function DELETE(request, response){

    const data = await request.json();
    const res = await prisma.categories.delete({
      data: data
    });
    console.log(res)
    return new Response(JSON.stringify(res), {headers:{'Content-type':'application/json'}, status:200}); 
  }
  
  export async function PUT(request, {params}){
    try {
        let id = Number(params.id)
            const {name} = await request.json();
            const res = await prisma.categories.update({
            where: {id:id},
            data: {
                name
            }
    });
    console.log(res)
    return new Response(JSON.stringify(res), {headers:{'Content-type':'application/json'}, status:200}); 

    } catch (error) {
        console.log(error.message)
    }
  }