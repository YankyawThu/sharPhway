import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try {
        await prisma.$connect()
        const { search } = req.query
        const data = await prisma.fyi.findMany({
            where: {
                title: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: 'Database error' })
    } finally {
        await prisma.$disconnect()
    }
}