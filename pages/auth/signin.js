import { signIn, getCsrfToken } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Button } from "@nextui-org/react"
import { Input } from "@nextui-org/input"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useTranslations } from 'next-intl'
import Locale from "@/components/locale"
import { postSignin } from '@/lib/api/signin'
import useSignInValidation from '@/lib/hooks/signInValidation'

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    // const providers = await getProviders()
    return {
        props: { csrfToken, messages: (await import(`../locales/${context.locale}.json`)).default }
    }
}

export default function Signin({csrfToken}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const { values, errors, emailInValid, passwordInValid, handleChange, validate } = useSignInValidation({email, password})
    const t = useTranslations('signin')

    const router = useRouter()
    
    const toggleVisibility = () => setIsVisible(!isVisible)

    const handleSignIn = async (e) => {
        e.preventDefault()
        validate()
        if(values.email != '' && values.password != '') {
            const response = await postSignin({
                email: values.email, password: values.password
            })
            if(response) {
                validate(response.type, null, response.msg)
            }
        }
    }

    return (
        <div className="flex flex justify-center items-center h-screen">
            <div className="w-[22rem] border-2 dark:border-gray-700 p-7 rounded-2xl">
                <div className="flex justify-between">
                    <div>
                        <div className="text-2xl font-bold">{t('hey')},</div>
                        <div className="text-2xl font-bold">{t('loginNow')}.</div>
                    </div>
                    <Locale />
                </div>
                <div className="inline-flex items-center py-4">
                    <div className="text-gray-500 text-xs mr-2">{t('ifYouAreNew')} /</div>
                    <button className="" onClick={() => router.push('/auth/signup')}>{t('createNew')}</button>
                </div>
                <div className="mt-4">
                    <form method="post" onSubmit={handleSignIn}>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div className="flex flex-col gap-3">
                            <Input
                                type="email"
                                label={t('email')}
                                variant="bordered"
                                value={values.email}
                                isInvalid={emailInValid}
                                errorMessage={errors.email ? t(errors.email) : ''}
                                className=""
                                fullWidth="true"
                                name="email"
                                onChange={handleChange}
                            />
                            <Input
                                label={t('password')}
                                variant="bordered"
                                value={values.password}
                                isInvalid={passwordInValid}
                                errorMessage={errors.password ? t(errors.password) : ''}
                                className=""
                                fullWidth="true"
                                name="password"
                                onChange={handleChange}
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
                            {t('login')}
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