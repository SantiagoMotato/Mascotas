"use client"

import Link from "next/link"

export default function Home() {
  return (
   <>
      <main className="flex justify-center">
          <section  className="relative h-screen w-96 bg-cover bg-center"
            style={{ backgroundImage: 'url(/bg-login.svg)', }}>
              <div className="grid flex-col gap-5 relative top-custom max-w-80 mx-auto">
                  <input className="p-2 rounded-3xl outline-none opacity-75" placeholder="Correo electrónico..."></input>
                  <input className="p-2 rounded-3xl outline-none opacity-75" placeholder="Contraseña..."></input>
                  {/* <button className="p-2 rounded-3xl bg-blue-900 hover:bg-blue-700 transition-all text-white font-medium" onClick={()=>{alert("Hola Login")}}>Ingresar</button> */}
                  <Link href="/mascotas" className="p-2 rounded-3xl text-center bg-blue-900 hover:bg-blue-700 transition-all text-white font-medium">Ingresar</Link>
              </div>
          </section>
      </main>
   </>
  );
}
