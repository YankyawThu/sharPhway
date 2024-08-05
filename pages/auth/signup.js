import { signIn } from "next-auth/react"
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Button } from "@nextui-org/react"
import { Input } from "@nextui-org/input"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useTranslations } from 'next-intl'
import Locale from "@/components/locale"

export async function getStaticProps(context) {
    return {
        props: { messages: (await import(`../locales/${context.locale}.json`)).default }
    }
}

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const t = useTranslations('signup')

    const router = useRouter()

    const toggleVisibility = () => setIsVisible(!isVisible)

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
        <div className="flex flex justify-center items-center h-screen">
            <div className="w-[22rem] border-2 dark:border-gray-700 p-7 rounded-2xl">
                <div className="flex justify-between">
                    <div>
                        <div className="text-2xl font-bold">{t('hey')},</div>
                        <div className="text-2xl font-bold">{t('signupNow')}.</div>
                    </div>
                    <Locale />
                </div>
                <div className="inline-flex items-center py-4">
                    <div className="text-gray-500 text-xs mr-2">{t('ifYouHaveAlready')} /</div>
                    <button className="" onClick={() => router.push('/auth/signin')}>{t('goLogin')}</button>
                </div>
                <div className="mt-4">
                    <form onSubmit={handleSignUp}>
                    <div className="flex flex-col gap-2">
                        <Input
                            type="text"
                            label={t('username')}
                            variant="bordered"
                            defaultValue={name}
                            isInvalid={false}
                            errorMessage="Please enter a valid email"
                            className="h-16"
                            fullWidth="true"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type="email"
                            label={t('email')}
                            variant="bordered"
                            defaultValue={email}
                            isInvalid={false}
                            errorMessage="Please enter a valid email"
                            className="h-16"
                            fullWidth="true"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label={t('password')}
                            variant="bordered"
                            defaultValue={password}
                            isInvalid={false}
                            errorMessage="Please enter a valid email"
                            className="h-16"
                            fullWidth="true"
                            onChange={(e) => setPassword(e.target.value)}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    {isVisible ? (
                                    <AiOutlineEyeInvisible className="text-xl text-default-400 pointer-events-none" />
                                    ) : (
                                    <AiOutlineEye className="text-xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                        />
                    </div>
                    <Button type="submit" color="warning" variant="solid" radius="md" fullWidth="true" className="font-semibold mt-5 h-12">
                        {t('register')}
                    </Button>
                    </form>
                </div>
                <div className="text-gray-500 h-[1px] bg-gray-200 dark:bg-gray-600 leading-[0px] text-center mt-5 mb-4"><span className="px-3 dark:bg-[#17191d] bg-white">or</span></div>
                <div className="flex flex-col gap-3">
                    <button onClick={() => signIn("google")} className="flex w-full items-center border-2 dark:bg-gray-900 bg-gray-100 dark:border-gray-700 rounded-xl py-3">
                        <FcGoogle className="flex-none w-14 text-xl" />
                        <div className="grow">{t('continueWithGoogle')}</div>
                        <div className="flex-none w-14"></div>
                    </button>
                    <button onClick={() => signIn("facebook")} className="flex w-full items-center border-2 dark:bg-gray-900 bg-gray-100 dark:border-gray-700 rounded-xl py-3">
                        <FaFacebook className="text-blue-500 flex-none w-14 text-xl" />
                        <div className="grow">{t('continueWithFacebook')}</div>
                        <div className="flex-none w-14"></div>
                    </button>
                </div>
            </div>
        </div>
    )
}