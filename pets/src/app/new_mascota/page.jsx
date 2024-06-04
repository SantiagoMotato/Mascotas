"use client"

function NewMascota() {

  const onSubmit = (e) => {
      e.preventDefault()
      const nombre = e.target.elements.nombre.value;
      const raza = e.target.elements.raza.value;
      const categoria = e.target.elements.categoria.value;
      const foto = e.target.elements.foto.value;
      const genero = e.target.elements.genero.value;
      console.log(nombre, raza, categoria, foto, genero);
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

export default NewMascota
