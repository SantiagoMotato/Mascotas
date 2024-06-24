import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
       
        const res = await prisma.$queryRaw` /* $queryRaw en como una funcion de Prisma que permite ejecutar consultas SQL */
            SELECT nombreMascota, COUNT(*) as count
            FROM pets
            GROUP BY nombreMascota
            HAVING COUNT(*) > 1;
        `;

     
        console.log('Resultados de la consulta:', res[0]);

  
        const formattedRes = res.map(item => ({
            ...item,
            count: item.count.toString() 
        }));

      
        if (formattedRes.length > 0) {
          
            return new Response(JSON.stringify(formattedRes), {
                headers: {'Content-Type': 'application/json'}, 
                status: 200
            });
        } else {
           
            return new Response(JSON.stringify({ message: 'No hay nombres repetidos' }), {
                headers: {'Content-Type': 'application/json'}, 
                status: 200
            });
        }
    } catch (error) {
     
        console.error('Error en el método GET:', error);

   
        return new Response(JSON.stringify({
            message: "Error en el método GET: " + error.message
        }), {
            headers: {'Content-Type': 'application/json'}, 
            status: 500
        });
    }
}
