import { signIn } from "next-auth/react"
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

    const handleSignUp = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })

        if (response.ok) {
            router.push('/auth/signin')
        } else {
            const data = await response.json()
            alert(data.message)
        }
    }

  return (
    <>
        <form onSubmit={handleSignUp}>
        <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
        </form>
        <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}