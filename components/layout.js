import { Padauk, Nunito } from "next/font/google"
import { useRouter } from "next/router"
import Navbar from "./navbar"
import { useSession } from "next-auth/react"

const padauk = Padauk({
    weight: ['400'],
    subsets: ["myanmar"]
})

const roboto = Nunito({
    // weight: '400',
    subsets: ["latin"]
})

export default function Layout({children}) {
    const { status } = useSession()
    const router = useRouter()
    const { locale: activeLocale } = router
    let fontStyle = ''

    if(activeLocale == 'en') {
        fontStyle = roboto.className
    }
    else fontStyle = padauk.className

    return (
        <>
        {status == 'authenticated' ?
            <main className={`min-h-screen antialiased ${fontStyle}`}>
                <Navbar />
                {children}
            </main>
            :
            <main className={`min-h-screen antialiased ${fontStyle}`}>
                {children}
            </main>
        }
        </>
    )
}