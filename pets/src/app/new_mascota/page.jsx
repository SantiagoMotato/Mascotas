/* "use client"

function NewMascota() {

  const onSubmit = async(e) => {
      e.preventDefault()
      // const nombre = e.target.elements.nombre.value;
      // const raza = e.target.elements.raza.value;
      // const categoria = e.target.elements.categoria.value;
      // const foto = e.target.elements.foto.value;
      // const genero = e.target.elements.genero.value;
      const nombre = e.target.elements.nombre.value;
      const raza = parseInt(e.target.elements.raza.value);  // Convertir a entero
      const categoria = parseInt(e.target.elements.categoria.value);  // Convertir a entero
      const foto = e.target.elements.foto.value;
      const genero = parseInt(e.target.elements.genero.value);  // Convertir a entero
      // console.log(nombre, raza, categoria, foto, genero);

      const res = await fetch('http://localhost:3000/api/pets', {
        method: 'POST',
        body: JSON.stringify({nombre,raza,categoria,foto,genero}),
        headers: {
          'Content-Type':'application/json'
        }
      })

      const data = await res.json()
      console.log(data)
  }

  return (
    <>
       <main className="flex justify-center">
        
          <section  className=" h-screen w-96 bg-cover bg-center bg-blue-950 text-white">

              <form action="" className="flex flex-col gap-6" onSubmit={onSubmit}>
                <h1 className="text-center mt-8">Adicionar Mascota</h1>

                <img src="icon-camera.svg" alt="" className="bg-slate-200 p-2 w-24 h-24 mx-auto rounded-full"/>

                <input name="nombre" id="nombre" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Nombre..." />
                <input name="raza" id="raza" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione raza..." />
                <input name="categoria" id="categoria" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Selecciones categoria..." />
                <input name="foto" id="foto" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Subir foto..." />
                <input name="genero" id="genero" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione género..." />
                <button className="bg-green-500 hover:bg-green-600 transition-all w-full p-2 rounded-3xl">Guardar</button>
              </form>

          </section>
      </main>
    </>
  )
}

export default NewMascota */



"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

async function loadGenders(){
  const res = await fetch('http://localhost:3000/api/genders');
  const dataGenders = await res.json();
  return dataGenders;
}

async function loadCategories(){
  const res = await fetch('/api/categories')
  const dataCategories = await res.json();
  return dataCategories;
}

async function loadRaces(){
  const res = await fetch('/api/races')
  const dataRaces = await res.json();
  return dataRaces;
}

function NewMascota() {

  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    async function fetchGenders() {
      const data = await loadGenders();
      setGenders(data);
    }
    fetchGenders();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const dataCategory = await loadCategories();
      setCategories(dataCategory);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchRaces() {
      const dataRaces = await loadRaces();
      setRaces(dataRaces);
    }
    fetchRaces();
  }, []);

  const router = useRouter()

  const onSubmit = async(e) => {
      e.preventDefault();
      
      const nombreMascota = e.target.elements.nombre.value;
      const raza = parseInt(e.target.elements.raza.value);  
      const categoria = parseInt(e.target.elements.categoria.value); 
      const foto = e.target.elements.foto.value;
      const genero = parseInt(e.target.elements.genero.value);  
      
      console.log("Datos a enviar:", {nombreMascota, raza, categoria, foto, genero});

      const res = await fetch('http://localhost:3000/api/pets', {
        method: 'POST',
        body: JSON.stringify({ nombreMascota, raza, categoria, foto, genero }),
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
          <img src="btn-back.svg" className="relative top-[calc(55px)] left-4 bg-slate-500 hover:bg-slate-300 transition-all py-1 px-2 rounded-full" onClick={()=>{
            router.push('/mascotas')
          }}/>
          <form action="" className="flex flex-col gap-6" onSubmit={onSubmit}>
            <h1 className="text-center mt-8">Adicionar Mascota</h1>
            <img src="icon-camera.svg" alt="" className="bg-slate-200 p-2 w-24 h-24 mx-auto rounded-full"/>

            <input name="nombre" id="nombre" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Nombre..." />

            <select name="raza" id="raza" className="p-2 bg-slate-400 border-none outline-none rounded-3xl text-blue-800">
              <option disabled selected>Seleciona una raza...</option>
              {races.map((race) => (
                <option key={race.id} value={race.id}>{race.name}</option>
              ))}
            </select>

            {/* <input name="raza" id="raza" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione raza..." /> */}

            <select name="categoria" id="categoria" className="p-2 bg-slate-400 border-none outline-none rounded-3xl text-blue-800">
              <option disabled selected>Seleciona una categoria...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>


            <input name="foto" id="foto" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Subir foto..." />

            {/* <input name="genero" id="genero" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione género..." /> */}

            <select name="genero" id="genero" className="p-2 bg-slate-400 border-none outline-none rounded-3xl text-blue-800">
              <option disabled selected>Seleciona un género...</option>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>{gender.name}</option>
              ))}
            </select>

            <button className="bg-green-500 hover:bg-green-600 transition-all w-full p-2 rounded-3xl mt-8">Guardar</button>
          </form>
        </section>
      </main>
    </>
  )
}

export default NewMascota;