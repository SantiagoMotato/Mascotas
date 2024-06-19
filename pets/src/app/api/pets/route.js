import { PrismaClient } from "@prisma/client";
import {writeFile} from "fs/promises"
import path from "path";

const prisma = new PrismaClient()

export async function GET(){
    try {
        const res = await prisma.pets.findMany({
            select: {
                id:true,
                category_id: {select: {name: true}},
                race_id: {select: {name: true}},
                gender_id: {select: {name: true}},
                photo: true,
                nombreMascota: true
            }
        });
        // console.log(res)
        return new Response(JSON.stringify(res), {headers:{'Content-type':'application/json'}, status:200}); 
    } catch (error) {
        return new Response(JSON.stringify({"Meesage":"Error de metodo GET" + error,status:500}))
    }
}


// export async function POST(request) {
//     try {
//       const { nombreMascota, raza, categoria, foto, genero } = await request.json();
//       console.log("Datos recibidos en el servidor:", { nombreMascota, raza, categoria, foto, genero });
  
//       const newPet = await prisma.pets.create({
//         data: {
//           race_id: { connect: { id: raza }},
//           category_id: { connect: { id: categoria }},
//           gender_id: { connect: { id: genero }},
//           photo: foto,
//           nombreMascota
//         }
//       });
  
//       return new Response(JSON.stringify(newPet));
//     } catch (error) {
//       return new Response(JSON.stringify({ "Message": "Error de metodo POST: " + error.message, status: 500 }));
//     }
//   }

export async function POST(request) {
    try {
        const formData = await request.formData();
        const nombreMascota = formData.get('nombreMascota');
        const raza = formData.get('raza');
        const categoria = formData.get('categoria');
        const genero = formData.get('genero');
        const photo = formData.get('photo');

        if(!photo){
            return Response.json({message:"No se ha cargado una foto!"}, {status:400})
        }

        const bytes = await photo.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filePath = path.join(process.cwd(), 'public/img', photo.name)
        writeFile(filePath, buffer)
        
        const newPet = await prisma.pets.create({
                    
                    data: {
                        nombreMascota: nombreMascota,
                        race: parseInt(raza), 
                        category: parseInt(categoria),  
                        gender: parseInt(genero), 
                        photo: `/img/${photo.name}`  // Ruta en donde está la imagen guardada junto con el name que viene de 'target->name'
                    }

        });

        console.log({ nombreMascota, raza, categoria, genero, photo });

        return new Response(JSON.stringify({
            message: "PHOTO UPLOADED!"
        }));
        // return new Response(JSON.stringify(newPet));
    } catch (error) {
        return new Response(JSON.stringify({ "Message": "Error de metodo POST: " + error.message, status: 500 }));
    }
}




// console.log("Archivo en ", filePath)

        // console.log(filePath)
        
        // console.log(file);
        // console.log(formData);


        // data: formData
                    // data: {
                    //   race_id: { connect: { id: raza }},
                    //   category_id: { connect: { id: categoria }},
                    //   gender_id: { connect: { id: genero }},
                    //   photo: file,
                    //   nombreMascota
                    // }
