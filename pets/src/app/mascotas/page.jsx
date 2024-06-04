"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

async function loadPets(){
  const res = await fetch('http://localhost:3000/api/pets')
  const data = await res.json()
  return data;
}

function page() {

  const router = useRouter();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const petsData = await loadPets();
      setPets(petsData);
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
                    <div key={pet.id} className="flex bg-blue-300 w-full h-22 mb-4 rounded-xl px-4 text-xs">
                        <img src="photo-sm-1.svg" alt="" />
                      <div className="grid grid-cols-1 grid-rows-auto ml-4">
                        <p>Raza: {pet.race_id.name}</p>
                        <p>Categoria: {pet.category_id.name}</p>
                        <p>Género: {pet.gender_id.name}</p>
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
