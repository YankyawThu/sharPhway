import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try {
        await prisma.$connect()
        const lastTen = await prisma.exchange.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 10
        })
        const last = await prisma.exchange.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        })
        let down = true
        if(lastTen[0].buy > lastTen[1].buy) {
            down = false
        }
        return res.status(200).json({lastTen, last, down})
    } catch (error) {
        return res.status(500).json({ msg: 'Database error' })
    } finally {
        await prisma.$disconnect()
    }
}