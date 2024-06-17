import { PrismaClient } from "@prisma/client";
import {writeFile} from "fs/promises"
import path from "path";

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


export async function PUT(request, { params }) {
    try {
        let id = Number(params.id);
        const formData = await request.formData();
        const nombreMascota = formData.get('nombreMascota');
        const raza = formData.get('raza');
        const categoria = formData.get('categoria');
        const genero = formData.get('genero');
        const photo = formData.get('photo');

        if (photo && photo.arrayBuffer) {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = path.join(process.cwd(), 'public/img', photo.name);
            await writeFile(filePath, buffer);

            const newPet = await prisma.pets.update({
                where: { id: id },
                data: {
                    nombreMascota: nombreMascota,
                    race: parseInt(raza),
                    category: parseInt(categoria),
                    gender: parseInt(genero),
                    photo: `/img/${photo.name}`
                }
            });

            return new Response(JSON.stringify({ message: "Mascota actualizada!", pet: newPet }), { status: 200 });
        } else {
            throw new Error('Photo is not a valid file or does not have arrayBuffer method');
        }
    } catch (error) {
        return new Response(JSON.stringify({ "Meesage": "Error de metodo PUT: " + error.message, status: 500 }), { status: 500 });
    }
}

