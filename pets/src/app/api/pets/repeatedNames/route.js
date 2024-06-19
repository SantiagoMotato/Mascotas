import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Ejecutar la consulta SQL cruda para encontrar nombres de mascotas repetidos
        const res = await prisma.$queryRaw`
            SELECT nombreMascota, COUNT(*) as count
            FROM pets
            GROUP BY nombreMascota
            HAVING COUNT(*) > 1;
        `;

        // Log para depurar el resultado de la consulta
        console.log('Resultados de la consulta:', res[0]);

        // Convertir BigInt a string
        const formattedRes = res.map(item => ({
            ...item,
            count: item.count.toString() // Convertir count de BigInt a string
        }));

        // Verificar si hay resultados
        if (formattedRes.length > 0) {
            // Devolver los resultados en la respuesta
            return new Response(JSON.stringify(formattedRes), {
                headers: {'Content-Type': 'application/json'}, 
                status: 200
            });
        } else {
            // Devolver un mensaje si no hay nombres repetidos
            return new Response(JSON.stringify({ message: 'No hay nombres repetidos' }), {
                headers: {'Content-Type': 'application/json'}, 
                status: 200
            });
        }
    } catch (error) {
        // Log de errores para depuración
        console.error('Error en el método GET:', error);

        // Devolver una respuesta de error
        return new Response(JSON.stringify({
            message: "Error en el método GET: " + error.message
        }), {
            headers: {'Content-Type': 'application/json'}, 
            status: 500
        });
    }
}
