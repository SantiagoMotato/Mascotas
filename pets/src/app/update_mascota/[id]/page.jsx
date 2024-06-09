"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function updateMascota({params}) {
  const router = useRouter();
  const [nombreMascota, setNombreMascota] = useState("");
  const [race_id, setRaza] = useState("");
  const [category_id, setCategoria] = useState("");
  const [photo, setFoto] = useState("");
  const [gender_id, setGenero] = useState("");

  //Variables de entorno para las traer los datos seleccionados a una mascota y para guardar el nuevo valor o genero de una mascota
  const [genders, setGenders] = useState([]);
  const [categories,setCategories] = useState([]);

  useEffect(() => {
    if(params.id){
        fetch(`http://localhost:3000/api/pets/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombreMascota(data.nombreMascota);
          setRaza(data.race);
          setCategoria(data.category);
          setFoto(data.photo);
          setGenero(data.gender);
        })
    }

    // Fetch genders data - Sirve para traer los datos de la tabla Genders que son los generos de las mascotas
    fetch('http://localhost:3000/api/genders')
      .then((res) => res.json())
      .then((data) => {
        setGenders(data);
      });

    fetch('http://localhost:3000/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
      
  }, [params.id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch(`http://localhost:3000/api/pets/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ nombreMascota, race_id, category_id, photo, gender_id }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    console.log("Respuesta de la API:", data);
    router.push('/mascotas')
  }

  return (
    <>
      <main className="flex justify-center">
        <section className="h-screen w-96 bg-cover bg-center bg-blue-950 text-white">
          <img src="/btn-back.svg" className="relative top-[calc(55px)] left-4 bg-slate-500 hover:bg-slate-300 transition-all py-1 px-2 rounded-full" onClick={() => {
            router.push('/mascotas')
          }} />
          <form action="" className="flex flex-col gap-6" onSubmit={onSubmit}>
            <h1 className="text-center mt-8">Modificar Mascota</h1>
            <img src="/icon-camera.svg" alt="" className="bg-slate-200 p-2 w-24 h-24 mx-auto rounded-full" />

            <input name="nombre" id="nombre" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Nombre..." onChange={(e) => setNombreMascota(e.target.value)} value={nombreMascota} />
          
            <input name="raza" id="raza" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione raza..." onChange={(e) => setRaza(parseInt(e.target.value))} value={race_id} />

            {/* <input name="categoria" id="categoria" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione categoria..." onChange={(e) => setCategoria(parseInt(e.target.value))} value={category_id} /> */}
            <select name="categoria" id="categoria" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" onChange={(e) => setCategoria(parseInt(e.target.value))} value={category_id}>
              <option value="">Seleccione una categoria...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            <input name="foto" id="foto" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Subir foto..." onChange={(e) => setFoto(e.target.value)} value={photo} />

            <select name="genero" id="genero" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" onChange={(e) => setGenero(parseInt(e.target.value))} value={gender_id}>
              <option value="">Seleccione género...</option>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>{gender.name}</option>
              ))}
            </select>

            <button className="bg-green-500 hover:bg-green-600 transition-all w-full p-2 rounded-3xl mt-8">Modificar</button>
          </form>
        </section>
      </main>
    </>
  )
}

export default updateMascota;
