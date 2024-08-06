import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try {
        await prisma.$connect()
        const { email, password } = req.body

        const existedUser = await prisma.user.findUnique({
            where: { email },
        })
    
        if (!existedUser) {
            return res.status(409).json({type: 'email', msg: 'emailNoExists' })
        }
        else {
            const isEqual = await compare(password, existedUser.password)
            if(!isEqual) {
                return res.status(409).json({type: 'password', msg: 'passwordIncorrect' })
            }
        }

    } catch (error) {
        throw error
        return res.status(500).json({ msg: 'Database error' })
    } finally {
        await prisma.$disconnect()
    }
    return res.status(200).json(null)
}