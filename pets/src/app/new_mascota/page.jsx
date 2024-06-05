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

function NewMascota() {

  const router = useRouter()

  const onSubmit = async(e) => {
      e.preventDefault();
      
      const nombre = e.target.elements.nombre.value;
      const raza = parseInt(e.target.elements.raza.value);  // Convertir a entero
      const categoria = parseInt(e.target.elements.categoria.value);  // Convertir a entero
      const foto = e.target.elements.foto.value;
      const genero = parseInt(e.target.elements.genero.value);  // Convertir a entero
      
      console.log("Datos a enviar:", {nombre, raza, categoria, foto, genero});

      const res = await fetch('http://localhost:3000/api/pets', {
        method: 'POST',
        body: JSON.stringify({ nombre, raza, categoria, foto, genero }),
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
            <input name="raza" id="raza" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione raza..." />
            <input name="categoria" id="categoria" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione categoria..." />
            <input name="foto" id="foto" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Subir foto..." />
            <input name="genero" id="genero" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione género..." />
            <button className="bg-green-500 hover:bg-green-600 transition-all w-full p-2 rounded-3xl mt-8">Guardar</button>
          </form>
        </section>
      </main>
    </>
  )
}

export default NewMascota;