import { signIn, getCsrfToken } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState } from 'react'

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    // const providers = await getProviders()
    return {
        props: { csrfToken }
    }
}

export default function Signin({csrfToken}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignIn = async (e) => {
        e.preventDefault()
    
        const response = await signIn('credentials', {
            email,
            password
        })
    }

    return (
        <>
            <form method="post" onSubmit={handleSignIn}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <div>
                <label>
                    Email
                    <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                </div>
                <div>
                <label>
                    Password
                    <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                </div>
                <button type="submit">Sign in</button>
            </form>
            <button onClick={() => signIn("google")}>Sign in with Google</button>
            <br></br>
            <button onClick={() => router.push('/auth/signup')}>Sign Up</button>
        </>
    )
}