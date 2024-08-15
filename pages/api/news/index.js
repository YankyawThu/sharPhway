import { PrismaClient } from '@prisma/client'
import { PER_PAGE } from '@/lib/config/const'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try {
        await prisma.$connect()
        const {page} = req.query
        const totalCount = await prisma.news.count()
        const totalPages = Math.ceil(totalCount / PER_PAGE)
        const data = await prisma.news.findMany({
            skip: parseInt(page) * PER_PAGE,
            take: PER_PAGE,
            orderBy: {
                createdAt: 'desc'
            }
        })
        return res.status(200).json({data, totalPages})
    } catch (error) {
        return res.status(500).json({ msg: 'Database error' })
    } finally {
        await prisma.$disconnect()
    }
}