// "use client"

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// function updateMascota({params}) {
//   const router = useRouter();
//   const [nombreMascota, setNombreMascota] = useState("");
//   const [race_id, setRaza] = useState("");
//   const [category_id, setCategoria] = useState("");
//   const [photo, setFoto] = useState("");
//   const [gender_id, setGenero] = useState("");

//   //Variables de entorno para las traer los datos seleccionados a una mascota y para guardar el nuevo valor o genero de una mascota
//   const [genders, setGenders] = useState([]);
//   const [categories,setCategories] = useState([]);
//   const [races,setRaces] = useState([]);

//   useEffect(() => {
//     if(params.id){
//         fetch(`http://localhost:3000/api/pets/${params.id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setNombreMascota(data.nombreMascota);
//           setRaza(data.race);
//           setCategoria(data.category);
//           setFoto(data.photo);
//           setGenero(data.gender);
//         })
//     }

//     // Fetch genders data - Sirve para traer los datos de la tabla Genders que son los generos de las mascotas
//     fetch('http://localhost:3000/api/genders')
//       .then((res) => res.json())
//       .then((data) => {
//         setGenders(data);
//       });

//     fetch('http://localhost:3000/api/categories')
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(data);
//       });
      
//     fetch('http://localhost:3000/api/races')
//       .then((res) => res.json())
//       .then((data) => {
//         setRaces(data);
//       });
      
//   }, [params.id]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
    
//     const res = await fetch(`http://localhost:3000/api/pets/${params.id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ nombreMascota, race_id, category_id, photo, gender_id }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     const data = await res.json();
//     console.log("Respuesta de la API:", data);
//     router.push('/mascotas')
//   }

//   return (
//     <>
//       <main className="flex justify-center">
//         <section className="h-screen w-96 bg-cover bg-center bg-blue-950 text-white">
//           <img src="/btn-back.svg" className="relative top-[calc(55px)] left-4 bg-slate-500 hover:bg-slate-300 transition-all py-1 px-2 rounded-full" onClick={() => {
//             router.push('/mascotas')
//           }} />
//           <form action="" className="flex flex-col gap-6" onSubmit={onSubmit}>
//             <h1 className="text-center mt-8">Modificar Mascota</h1>
//             <img src="/icon-camera.svg" alt="" className="bg-slate-200 p-2 w-24 h-24 mx-auto rounded-full" />

//             <input name="nombre" id="nombre" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Nombre..." onChange={(e) => setNombreMascota(e.target.value)} value={nombreMascota} />
          
//             {/* <input name="raza" id="raza" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione raza..." onChange={(e) => setRaza(parseInt(e.target.value))} value={race_id} /> */}
//             <select name="raza" id="raza" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" onChange={(e) => setRaza(parseInt(e.target.value))} value={race_id}>
//               <option value="">Seleccione una raza...</option>
//               {races.map((race) => (
//                 <option key={race.id} value={race.id}>{race.name}</option>
//               ))}
//             </select>

//             {/* <input name="categoria" id="categoria" type="number" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Seleccione categoria..." onChange={(e) => setCategoria(parseInt(e.target.value))} value={category_id} /> */}
//             <select name="categoria" id="categoria" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" onChange={(e) => setCategoria(parseInt(e.target.value))} value={category_id}>
//               <option value="">Seleccione una categoria...</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>{category.name}</option>
//               ))}
//             </select>

//             <input name="foto" id="foto" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Subir foto..." onChange={(e) => setFoto(e.target.value)} value={photo} />

//             <select name="genero" id="genero" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" onChange={(e) => setGenero(parseInt(e.target.value))} value={gender_id}>
//               <option value="">Seleccione género...</option>
//               {genders.map((gender) => (
//                 <option key={gender.id} value={gender.id}>{gender.name}</option>
//               ))}
//             </select>

//             <button className="bg-green-500 hover:bg-green-600 transition-all w-full p-2 rounded-3xl mt-8">Modificar</button>
//           </form>
//         </section>
//       </main>
//     </>
//   )
// }

// export default updateMascota;


"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function updateMascota({ params }) {
  const router = useRouter();
  const [nombreMascota, setNombreMascota] = useState("");
  const [race_id, setRaza] = useState("");
  const [category_id, setCategoria] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [gender_id, setGenero] = useState("");

  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [races, setRaces] = useState([]);
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    if (params.id) {
      fetch(`http://localhost:3000/api/pets/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombreMascota(data.nombreMascota);
          setRaza(data.race);
          setCategoria(data.category);
          setPhoto(data.photo);
          setGenero(data.gender);
        });
    }

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

    fetch('http://localhost:3000/api/races')
      .then((res) => res.json())
      .then((data) => {
        setRaces(data);
      });

    fetch(`/api/pets/${params.id}`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        setPetData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching para mostrar datos de la mascota:', error);
      });

  }, [params.id]);

  const onChangePhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombreMascota', nombreMascota);
    formData.append('raza', race_id);
    formData.append('categoria', category_id);
    formData.append('genero', gender_id);
    if (photoFile) {
      formData.append('photo', photoFile);
    } else {
      formData.append('photo', photo); // Mantener la foto actual si no hay nueva
    }

    const res = await fetch(`http://localhost:3000/api/pets/${params.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Respuesta de la API:", data);
      router.push('/mascotas');
    } else {
      console.error("Error al actualizar la mascota:", await res.text());
    }
  };

  return (
    <>
      <main className="flex justify-center">
        <section className="h-screen w-96 bg-cover bg-center bg-blue-950 text-white">
          <img src="/btn-back.svg" className="relative top-[calc(55px)] left-4 bg-slate-500 hover:bg-slate-300 transition-all py-1 px-2 rounded-full" onClick={() => {
            router.push('/mascotas');
          }} />
          <form action="" className="flex flex-col gap-6" onSubmit={onSubmit}>
            <h1 className="text-center mt-8">Modificar Mascota</h1>

            <input type="file" accept="image/*" name="photo" className="hidden" id="photo" onChange={onChangePhoto} />
            <label htmlFor="photo">
              {
                photo || photoFile ? (
                  <img
                    src={photoFile ? URL.createObjectURL(photoFile) : photo}
                    alt="No Photo"
                    className="bg-slate-500 p-1 w-36 h-36 mx-auto text-center text rounded-full cursor-pointer object-cover"
                  />
                ) : (
                  <img
                    src=""
                    alt="Select Photo"
                    className="bg-slate-200 p-2 w-36 h-36 mx-auto rounded-full cursor-pointer"
                  />
                )
              }
            </label>

            <input name="nombre" id="nombre" type="text" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" placeholder="Nombre..." onChange={(e) => setNombreMascota(e.target.value)} value={nombreMascota} />

            <select name="raza" id="raza" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" onChange={(e) => setRaza(parseInt(e.target.value))} value={race_id}>
              <option value="">Seleccione una raza...</option>
              {races.map((race) => (
                <option key={race.id} value={race.id}>{race.name}</option>
              ))}
            </select>

            <select name="categoria" id="categoria" className="p-2 bg-slate-400 text-white placeholder-blue-800 outline-none rounded-3xl" onChange={(e) => setCategoria(parseInt(e.target.value))} value={category_id}>
              <option value="">Seleccione una categoria...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

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
  );
}

export default updateMascota;



