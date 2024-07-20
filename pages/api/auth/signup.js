import { hash } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const existingEmail = await prisma.user.findUnique({
        where: { email },
    })

    if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists' })
    }

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    return res.status(201).json({ message: 'User created', user })
}