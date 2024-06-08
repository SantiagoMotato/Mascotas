import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

/* export async function GET(request, {params}){
    try {
        let id = Number(params.id);
        const res = await prisma.pets.findUnique({where: {id:id} })

        return new Response(JSON.stringify(res),
        {headers: {'Content-Type':'application/json'}})
        
    } catch (error) {
        return new Response(JSON.stringify({"Meesage":"Error de metodo GET[id]" + error,status:500}))
    }
} */
export async function GET(request, {params}){
    try {
        let id = Number(params.id);
        const res = await prisma.pets.findUnique({
            where: { id: id },
            include: {
                race_id: true,
                category_id: true,
                gender_id: true,
            },
        });

        return new Response(JSON.stringify(res), {
            headers: { 'Content-Type': 'application/json' },
        });
        
    } catch (error) {
        return new Response(JSON.stringify({"Meesage":"Error de metodo GET[id]" + error,status:500}))
    }
}

export async function DELETE(request, {params}){
    try {
        let id = Number(params.id);
        const newPet = await prisma.pets.delete({
            where: {id:id}
        });

        return Response.json({message: "Mascota eliminada", pet:newPet});
        
    } catch (error) {
        return new Response(JSON.stringify({"Meesage":"Error de metodo DELETE" + error,status:500}))
    }
}

export async function PUT(request, {params}){
    try {
        let id = Number(params.id);
        const {race_id,category_id,gender_id,photo} = await request.json();
        const newPet = await prisma.pets.update({
            where: {id:id},
            data:{
                race_id: { connect:{id:race_id}},
                category_id: {connect:{id:category_id}},
                gender_id: {connect: {id:gender_id}},
                photo
            }
        })

        return Response.json({message: "Mascota actualizada!", pet:newPet})

    } catch (error) {
        return new Response(JSON.stringify({"Meesage":"Error de metodo PUT" + error,status:500}))
    }
}

