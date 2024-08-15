import { Padauk, Roboto } from "next/font/google"
import { useRouter } from "next/router"
import NavbarLayout from "./navbar"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import Footer from "./footer"

const padauk = Padauk({
    weight: ['400'],
    subsets: ["myanmar"]
})

const roboto = Roboto({
    weight: '400',
    subsets: ["latin"]
})

export default function Layout({children}) {
    const { status } = useSession()
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const { locale: activeLocale } = router
    let fontStyle = ''

    if(activeLocale == 'en') {
        fontStyle = roboto.className
    }
    else fontStyle = padauk.className + 'text-[14px]'

    return (
        <>
        {status == 'authenticated' ?
            <main className={`min-h-screen ${fontStyle} ${theme == 'light' ? 'bg-color' : 'dark-bg-color'}`}>
                <NavbarLayout />
                {children}
                <Footer />
            </main>
            :
            <main className={`min-h-screen ${fontStyle}`}>
                {children}
            </main>
        }
        </>
    )
}