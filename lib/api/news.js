export const fetchNews = async (page = 0) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?page=${page}`)
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.msg)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching:', error)
        throw error
    }
}