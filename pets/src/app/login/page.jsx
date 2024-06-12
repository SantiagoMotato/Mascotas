"use client"

// import Link from "next/link"
import {useForm} from "react-hook-form"
import {signIn} from "next-auth/react" //Usamos estos modulos/funciones, que estan enfocados al cliente, para poder enviar/validar los datos con el Backend
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const router = useRouter()
    const [error, setError] = useState(null)
    
    const onSubmit = handleSubmit( async(data) => {
        console.log(data)
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        console.log(res)

        if(res.error) {
            setError(res.error)
        } else {
            // console.log("Enviando")
            router.push('/mascotas')
        }

    })

  return (
   <>
      <main className="flex justify-center">
          <section  className="relative h-screen w-96 bg-cover bg-center overflow-y-auto"
            style={{ backgroundImage: 'url(/bg-login.svg)', }}>
              <form onSubmit={onSubmit} >
                {error && (
                    <span className="bg rounded bg-red-500 bg-opacity-80 text-sx text-white p-3 absolute left-24 top-5">{error}</span>
                )}
              <div className="grid flex-col gap-5 relative top-custom max-w-80 mx-auto">

                  <input 
                  type="email" 
                  {...register("email", {
                        required: {
                            value: true,
                            message: "El email es requerido!"
                        }
                    })} 
                    className="p-2 rounded-3xl outline-none opacity-75" placeholder="Correo electrónico..."/>
                    {errors.email && (
                        <span className="relative bottom-4 text-red-600 text-xs bg-slate-300 opacity-75 p-[calc(2px)] rounded">
                            {errors.email.message}
                        </span>
                    )}
                    
                  <input 
                  type="password" 
                  {...register("password", {
                        required: {
                            value: true,
                            message: "La contraseña es requerida!"
                        }
                    })}  
                    className="p-2 rounded-3xl outline-none opacity-75" placeholder="Contraseña..."/>
                    {errors.password && (
                        <span className="relative bottom-4 text-red-600 text-xs bg-slate-300 opacity-75 p-[calc(2px)] rounded">
                            {errors.password.message}
                        </span>
                    )}


                  <button className="p-2 rounded-3xl bg-blue-900 hover:bg-blue-700 transition-all text-white font-medium">Ingresar</button>
                  {/* <Link href="/mascotas" className="p-2 rounded-3xl text-center bg-blue-900 hover:bg-blue-700 transition-all text-white font-medium">Ingresar</Link> */}
              </div>
              </form>
          </section>
      </main>
   </>
  );
}
