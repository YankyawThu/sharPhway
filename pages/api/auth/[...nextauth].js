import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            authorization: {
                params: {
                  scope: 'email'
                },
            }
        }),
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })
                if (user && await compare(credentials.password, user.password)) {
                    return user
                }
                return null
            }
        }),
    ],
    pages: {
        signIn: '/auth/signin', // Custom sign-in page
    },
    session: {
        strategy: 'jwt', // Ensure JWT strategy is used
        maxAge: 7 * 24 * 60 * 60, // days * hrs * min * sec
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if(user) return true
            else return false
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, token }) {
            // Manage session data for the client and token for middleware
            const user = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email,
                },
            })
            session.user.role = user.role
            token.role = user.role
            return session
        }
    },
})