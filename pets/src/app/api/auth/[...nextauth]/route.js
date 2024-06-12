import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const authOptions = {
        providers: [
            CredentialsProvider({
                name: "Credentials",
                credentials: {
                    email: { label: "Email", type:"text", placeholder:"aaa"},
                    password: {label: "Password", type: "password", placeholder:"***"}
                },
                async authorize(credentials, request) {
                    console.log(credentials)

                    const userFound = await prisma.users.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })
                    if(!userFound) throw new Error('No se encontro el usuario')

                    // console.log(userFound)

                    // const matchPassword = await bcrypt.compare(userFound.password, userFound.email)

                    // if(!matchPassword) throw new Error('Contraseña incorrecta')
                    if (credentials.password !== userFound.password) {
                        throw new Error('Contraseña incorrecta')
                    }

                    return {
                        id: userFound.id,
                        name: userFound.fullname,
                        email: userFound.email
                    }
                    
                    // return null;
                }
            })
        ]
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}