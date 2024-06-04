import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(){
    try {
        const res = await prisma.pets.findMany({
            select: {
                category_id: {select: {name: true}},
                race_id: {select: {name: true}},
                gender_id: {select: {name: true}},
                photo: true
            }
        });
        console.log(res)
        return new Response(JSON.stringify(res), {headers:{'Content-type':'application/json'}, status:200}); 
    } catch (error) {
        return new Response(JSON.stringify({"Meesage":"Error de metodo GET" + error,status:500}))
    }
}

export async function POST(request){
    try {
        const {race_id,category_id,gender_id,photo} = await request.json();
        const newPet = await prisma.pets.create({
            data:{
                race_id: { connect:{id:race_id}},
                category_id: {connect:{id:category_id}},
                gender_id: {connect: {id:gender_id}},
                photo
            }
        })

        return new Response(JSON.stringify(newPet))

    } catch (error) {
        return new Response(JSON.stringify({"Meesage":"Error de metodo POST" + error,status:500}))
    }
}


/* export async function POST(request) {
    try {
        const { race_id, category_id, gender_id, photo } = await request.json();

        const newPet = await prisma.pets.create({
            data: {
                race: { connect: { id: race_id } },
                category: { connect: { id: category_id } },
                gender: { connect: { id: gender_id } },
                photo
            }
        });

        return new Response(JSON.stringify(newPet), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            "Message": "Error de metodo POST: " + error.message,
            status: 500
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
} */