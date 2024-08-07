export const createUser = async ({name, email, password}) => {
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
        return await response.json()
    } catch (error) {
        console.error('Error creating:', error)
        throw error
    }
}