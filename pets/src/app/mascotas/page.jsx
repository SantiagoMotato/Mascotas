"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

async function loadPets(){
  const res = await fetch('http://localhost:3000/api/pets')
  const data = await res.json()
  return data;
}

function MascotasPage({params}) {

  const router = useRouter();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const petsData = await loadPets();
      setPets(petsData);
      console.log(petsData)
    };
    
    fetchData();
  }, []); // Empty dependency array means this effect runs only once, on mount

  return (
    <main className="flex justify-center">
          <section  className="relative h-screen w-96 bg-cover bg-center bg-blue-950 text-white">
              <div className="flex justify-center font-semibold text-center mt-10 max-w-xs mx-auto">
                <h1 className="my-auto">Administrar mascotas</h1>
                <img src="/btn-close.svg" alt="" className="relative left-16 hover:cursor-pointer"/>
              </div>

              <div className="w-full ml-4 mt-10">
                <button className="bg-green-500 hover:bg-green-600 transition-all w-[calc(350px)] p-2 rounded-3xl"
                onClick={()=>{
                  router.push('/new_mascota')
              }}>Adicionar</button>
              </div>

              <div className="mt-6">
                {
                  pets.map(pet => (
                    <div key={pet.id} className="flex bg-slate-300 hover:bg-slate-200 transition-all  w-[calc(350px)] mx-auto h-22 mb-4 rounded-xl px-4 py-2 text-xs">
                        <img src="photo-sm-1.svg" alt=""/>
                      <div className="grid grid-cols-1 grid-rows-auto ml-4 text-base">
                        <h2 className="mt-4 text-blue-950 w-32">{pet.nombreMascota}</h2>
                        <p className="relative bottom-3 text-blue-900 text-sm">{pet.race_id.name}</p>
                        {/* <p>Pet ID: {pet.id}</p> */}
                        {/* <p>Categoria: {pet.category_id.name}</p>
                        <p>Género: {pet.gender_id.name}</p> */}
                      </div>
                      <div className="grid grid-cols-3 gap-x-1 w-full ml-20 mt-5 hover:cursor-pointer">
                        <img src="btn-show.svg" alt="" onClick={()=>{
                          router.push(`/mascota/${pet.id}`)
                        }}/>
                        <img src="btn-edit.svg" alt="" onClick={()=>{
                          router.push(`/update_mascota/${pet.id}`)
                        }}/>
                        <img src="btn-delete.svg" alt="" onClick={async()=>{
                           const res = await fetch(`http://localhost:3000/api/pets/${pet.id}`, {
                            method:"DELETE",
                          })
                          const data = await res.json();
                          console.log(data)
                          router.push("/mascotaEliminada")
                        }}/>
                      </div>
                    </div>
                  ))
                }
              </div>
          </section>
      </main>
  )
}

export default MascotasPage
