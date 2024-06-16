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
import Image from "next/image"

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
  const [photo, setPhoto] = useState();

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

/*   const onSubmit = async(e) => {
      e.preventDefault();
      
      const nombreMascota = e.target.elements.nombre.value;
      const raza = parseInt(e.target.elements.raza.value);  
      const categoria = parseInt(e.target.elements.categoria.value); 
      const genero = parseInt(e.target.elements.genero.value);  
      
      // const foto = e.target.elements.foto.value;

      // console.log(file)
      if(!file) return
      
      //FormData es como un formulario creado en JavaScript. "Form" son los datos que queremos enviar, es decir, es el archivo tecnicamente.
      const form = new FormData()
      form.set('file', file) //Aqui decimos que a 'file' le enviamos una propiedad de tipo "file" y el valor de ese archivo es 'file' es el archivo que definimos en la variable de estado

      console.log("Datos a enviar:", {nombreMascota, raza, categoria, form, genero});
      
      //Envio de datos
      const res = await fetch('http://localhost:3000/api/pets', {
        method: 'POST',
        body: JSON.stringify({ nombreMascota, raza, categoria, form, genero }),
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      });

      const data = await res.json();
      console.log("Respuesta de la API:", data);

      // router.push('/mascotas')
  } */

      const onChangePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
          setPhoto(e.target.files[0]);
        }
      };

      const onSubmit = async (e) => {
        e.preventDefault();
        
        const nombreMascota = e.target.elements.nombre.value;
        const raza = parseInt(e.target.elements.raza.value);
        const categoria = parseInt(e.target.elements.categoria.value);
        const genero = parseInt(e.target.elements.genero.value);
    
        // Asegurarse de que el archivo esté seleccionado
        if (!photo) return; //Quité esta validacion porque ya ésta definidad en el Backend
    
        // Crear FormData y agregar archivo y otros campos
        const form = new FormData();
        form.set('nombreMascota', nombreMascota);
        form.set('raza', raza);
        form.set('categoria', categoria);
        form.set('genero', genero);
        form.set('photo', photo);
    
        // Enviar datos
        const res = await fetch('http://localhost:3000/api/pets', {
            method: 'POST',
            body: form // Aquí se envía el FormData
        });
    
        const data = await res.json();
        console.log("Respuesta de la API:", data);
        
        router.push('/mascotas')
    };
    

  return (
    <>
      <main className="flex justify-center">
        <section className="h-screen w-96 bg-cover bg-center bg-blue-950 text-white">
          <img src="btn-back.svg" className="relative top-[calc(55px)] left-4 bg-slate-500 hover:bg-slate-300 transition-all py-1 px-2 rounded-full" onClick={()=>{
            router.push('/mascotas')
          }}/>
          <form action="" className="flex flex-col gap-6" onSubmit={onSubmit}>
            <h1 className="text-center mt-8">Adicionar Mascota</h1>




            
            {/* <input type="file" accept="image/*" name="photo" className="hidden" id="photo" onChange={(e)=>{
              // console.log(e.target.files[0])
              setPhoto(e.target.files[0])
            }}/>
              <label htmlFor="photo">
                <img src="icon-camera.svg" alt="" className="bg-slate-200 p-2 w-24 h-24 mx-auto rounded-full cursor-pointer" />
                {
                  photo && (
                    <Image src={URL.createObjectURL(photo)} className="mx-auto object-cover" width={64} height={64}/>
                  )
                }
              </label> */}
               <input type="file" accept="image/*" name="photo" className="hidden" id="photo" onChange={onChangePhoto} />
                  <label htmlFor="photo">
                    {
                      photo ? (
                        <Image
                          src={URL.createObjectURL(photo)}
                          alt="Selected Photo"
                          className="bg-slate-200 p-1 w-36 h-36 mx-auto rounded-full cursor-pointer object-cover"
                          width={96}
                          height={96}
                        />
                      ) : (
                        <img
                          src="icon-camera.svg"
                          alt="Select Photo"
                          className="bg-slate-200 p-2 w-36 h-36 mx-auto rounded-full cursor-pointer"
                        />
                      )
                    }
                  </label>





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


            {/* <input name="foto" id="foto" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Subir foto..." /> */}

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