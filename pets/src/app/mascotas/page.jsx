"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

async function loadPets(){
  const res = await fetch('http://localhost:3000/api/pets')
  const data = await res.json()
  return data;
}

function page({params}) {

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
              <img src="" alt="" />
              <h1 className="font-semibold text-center mt-10">Administrar mascotas</h1>
              <div className="w-full mt-10">
                <button className="bg-green-500 hover:bg-green-600 transition-all w-full p-2 rounded-3xl"
                onClick={()=>{
                  router.push('/new_mascota')
              }}>Adicionar</button>
              </div>

              <div className="mt-4">
                {
                  pets.map(pet => (
                    <div key={pet.id} className="flex bg-slate-400 hover:bg-slate-300 transition-all  w-full h-22 mb-4 rounded-xl px-4 py-2 text-xs">
                        <img src="photo-sm-1.svg" alt="" />
                      <div className="grid grid-cols-1 grid-rows-auto ml-4">
                        <p>Pet ID: {pet.id}</p>
                        <p>Raza: {pet.race_id.name}</p>
                        <p>Categoria: {pet.category_id.name}</p>
                        <p>Género: {pet.gender_id.name}</p>
                      </div>
                      <div className="flex w-8 h-8 gap-2 ml-8 mt-5">
                        <img src="btn-show.svg" alt="" onClick={()=>{
                          alert('Look!')
                        }}/>
                        <img src="btn-edit.svg" alt="" onClick={()=>{
                          alert('Edit')
                        }}/>
                        <img src="btn-delete.svg" alt="" onClick={async()=>{
                          //  const res = await fetch(`http://localhost:3000/api/pets/${pet.id}`, {
                          //   method:"DELETE",
                          // })
                          // const data = await res.json();
                          alert('Pet ID: '+pet.id)
                          console.log(pet.id)
                          // console.log(data)
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

export default page
