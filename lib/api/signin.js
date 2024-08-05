import { signIn } from "next-auth/react"

export const postSignin = async (data) => {
    const response = await signIn('credentials', {
        email: data.email,
        password: data.password
    })

    return response
}