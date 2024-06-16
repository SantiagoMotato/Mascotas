"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

function MascotaPage({ params }) {
    const router = useRouter()
    const [petData, setPetData] = useState([])
    // console.log(petData.race_id.name)

    useEffect(() => {
        {
            fetch(`/api/pets/${params.id}`, {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((data) => {
                    setPetData(data)
                    console.log(data)
                })
                .catch((error) => {
                    console.error('Error fetching pet data:', error)
                })
        }
    }, [params.id])

    return (
        <main className="flex justify-center">
            <section className="h-screen w-96 bg-cover bg-center bg-blue-950 text-white">
                <img src="/btn-back.svg" className="relative top-[calc(68px)] left-6 bg-slate-500 hover:bg-slate-300 transition-all py-1 px-2 rounded-full" onClick={() => {
                    router.push('/mascotas')
                }} />
                <h1 className="text-center text-xl mt-10">Consultar Mascota</h1>

                {/* <img src="/icon-camera.svg" alt="" className="bg-slate-200 p-2 w-24 h-24 mx-auto rounded-full mt-10 mb-10" /> */}
                {petData ? (
                <img src={petData.photo} alt="" className="bg-slate-200 p-2 w-24 h-24 mx-auto rounded-full mt-10 mb-10" />
                ) : (
                    <p>Loading image...</p>
                )}

                {petData ? (
                    <table className="flex bg-slate-300 gap-1 mx-6 rounded-2xl">
                        <thead>
                            <tr className="flex flex-col bg-slate-500 px-4 rounded-l-2xl">
                                <th className="text-start font-normal p-2">Nombre</th>
                                <th className="text-start font-normal p-2">Raza:</th>
                                <th className="text-start font-normal p-2">Categoria:</th>
                                <th className="text-start font-normal p-2">Género:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex flex-col text-blue-950">
                                <td className="text-start font-normal p-2">{petData.nombreMascota}</td>
                                <td className="text-start font-normal p-2">{petData.race_id?.name}</td>
                                <td className="text-start font-normal p-2">{petData.category_id?.name}</td>
                                <td className="text-start font-normal p-2">{petData.gender_id?.name}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </main>
    )
}

export default MascotaPage
