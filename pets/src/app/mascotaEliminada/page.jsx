import Link from "next/link"

function deletedPetPage() {
  return (
    <>
      <main className="flex justify-center">
          <section  className="relative h-screen w-96 bg-cover bg-center bg-blue-950 text-white">

             <div className="flex flex-col text-center absolute top-60">
                <h1 className="text-xl mx-5 p-4 rounded-md bg-slate-400">La mascota ha sido eliminada con éxito!!!</h1>

                <Link href="/mascotas" className="mt-20 text-sm mx-24 p-1 rounded-full bg-gray-600 hover:bg-slate-500 transition-all">Volver a la párgina principal</Link>
             </div>

          </section>
      </main>
    </>
  )
}

export default deletedPetPage
