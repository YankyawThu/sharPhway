export const fetchNews = async (page) => {
    try {
        const response = await fetch(`/api/news?page=${page}`)
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