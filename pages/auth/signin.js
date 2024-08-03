import { signIn, getCsrfToken } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Button } from "@nextui-org/react"
import { Input } from "@nextui-org/input"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

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
    const [isVisible, setIsVisible] = useState(false)

    const router = useRouter()
    
    const toggleVisibility = () => setIsVisible(!isVisible)

    const handleSignIn = async (e) => {
        e.preventDefault()
    
        const response = await signIn('credentials', {
            email,
            password
        })
    }

    return (
        <div className="flex flex justify-center items-center h-screen">
            <div className="w-96 border-2 dark:border-gray-700 p-10 rounded-2xl">
                <div className="text-2xl font-bold">Hey,</div>
                <div className="text-2xl font-bold">Login Now.</div>
                <div className="inline-flex items-center py-4">
                    <div className="text-gray-500 text-xs mr-2">If you are new /</div>
                    <button className="" onClick={() => router.push('/auth/signup')}>Create New</button>
                </div>
                <div className="mt-4">
                    <form method="post" onSubmit={handleSignIn}>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div className="flex flex-col gap-2">
                            <Input
                                type="email"
                                label="Email"
                                variant="bordered"
                                defaultValue={email}
                                isInvalid={false}
                                errorMessage="Please enter a valid email"
                                className=""
                                fullWidth="true"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                variant="bordered"
                                defaultValue={email}
                                isInvalid={false}
                                errorMessage="Please enter a valid email"
                                className=""
                                fullWidth="true"
                                onChange={(e) => setPassword(e.target.value)}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                      {isVisible ? (
                                        <AiOutlineEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                                      ) : (
                                        <AiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                                      )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />
                        </div>
                        <Button type="submit" color="warning" variant="solid" radius="md" fullWidth="true" className="border-[1px] borde py-[27px] mt-5">
                            Log In
                        </Button>  
                    </form>
                </div>
                <div className="text-gray-500 h-[1px] bg-gray-200 dark:bg-gray-600 leading-[0px] text-center mt-5 mb-4"><span className="px-3 dark:bg-[#17191d] bg-white">or</span></div>
                <div className="flex flex-col gap-3">
                    <button onClick={() => signIn("google")} className="flex w-full items-center border-2 dark:bg-gray-900 bg-gray-100 dark:border-gray-700 rounded-xl py-4">
                        <FcGoogle className="flex-none w-14 text-xl" />
                        <div className="grow">Continue with Google</div>
                        <div className="flex-none w-14"></div>
                    </button>
                    <button onClick={() => signIn("facebook")} className="flex w-full items-center border-2 dark:bg-gray-900 bg-gray-100 dark:border-gray-700 rounded-xl py-4">
                        <FaFacebook className="text-blue-500 flex-none w-14 text-xl" />
                        <div className="grow">Continue with Facebook</div>
                        <div className="flex-none w-14"></div>
                    </button>
                </div>
            </div>
        </div>
    )
}