import { signIn } from "next-auth/react"

export const postSignin = async (data) => {
    const checkPass = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    })
    if (checkPass.ok) {
        const response = await signIn('credentials', {
            email: data.email,
            password: data.password
        })
    }
    else return await checkPass.json()
}