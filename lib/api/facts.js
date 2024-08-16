export const fetchFacts = async (search = '') => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facts?search=${search}`)
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