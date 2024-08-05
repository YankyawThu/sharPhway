import { Padauk, Nunito } from "next/font/google"
import { useRouter } from "next/router"

const padauk = Padauk({
    weight: ['400'],
    subsets: ["myanmar"]
})
  
const roboto = Nunito({
    // weight: '400',
    subsets: ["latin"]
})

export default function Layout({children}) {

    const router = useRouter()
    const { locale: activeLocale } = router
    let fontStyle = ''

    if(activeLocale == 'en') {
        fontStyle = roboto.className
    }
    else fontStyle = padauk.className

    return (
        <main className={fontStyle}>
            {children}
        </main>
    )
}