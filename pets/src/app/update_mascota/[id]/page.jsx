"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function updateMascota({params}) {

  const router = useRouter()
  const [nombre, setNombre] = useState("");
  const [race_id, setRaza] = useState("");
  const [category_id, setCategoria] = useState("");
  const [photo, setFoto] = useState("");
  const [gender_id, setGenero] = useState("");

  useEffect(()=>{
    if(params.id){
        fetch(`http://localhost:3000/api/pets/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.nombre);
          setRaza(data.race);
          setCategoria(data.category);
          setFoto(data.photo);
          setGenero(data.gender);
        })
    }
  },  [params.id]);

  const onSubmit = async(e) => {
      e.preventDefault();
      
    //   const nombre = e.target.elements.nombre.value;
    //   const raza = parseInt(e.target.elements.raza.value);  // Convertir a entero
    //   const categoria = parseInt(e.target.elements.categoria.value);  // Convertir a entero
    //   const foto = e.target.elements.foto.value;
    //   const genero = parseInt(e.target.elements.genero.value);  // Convertir a entero
      
      console.log("Datos a enviar:", {nombre, race_id, category_id, photo, gender_id});

      const res = await fetch(`http://localhost:3000/api/pets/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ nombre, race_id, category_id, photo, gender_id }),
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
          <img src="/btn-back.svg" className="relative top-[calc(55px)] left-4 bg-slate-500 hover:bg-slate-300 transition-all py-1 px-2 rounded-full" onClick={()=>{
            router.push('/mascotas')
          }}/>
          <form action="" className="flex flex-col gap-6" onSubmit={onSubmit}>
            <h1 className="text-center mt-8">Modificar Mascota</h1> 
            <p>{params.id}</p>
            <img src="/icon-camera.svg" alt="" className="bg-slate-200 p-2 w-24 h-24 mx-auto rounded-full"/>

            <input name="nombre" id="nombre" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Nombre..." onChange={(e)=> setNombre(e.target.value)} value={nombre}/>

            <input name="raza" id="raza" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione raza..." onChange={(e) => setRaza(parseInt(e.target.value))} value={race_id}/>

            <input name="categoria" id="categoria" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione categoria..." onChange={(e)=> setCategoria(parseInt(e.target.value))} value={category_id}/>

            <input name="foto" id="foto" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Subir foto..." onChange={(e)=> setFoto(e.target.value)} value={photo}/>

            <input name="genero" id="genero" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione género..." onChange={(e)=> setGenero(parseInt(e.target.value))} value={gender_id}/>

            <button className="bg-green-500 hover:bg-green-600 transition-all w-full p-2 rounded-3xl mt-8">Modificar</button>
          </form>
        </section>
      </main>
    </>
  )
}

export default updateMascota;