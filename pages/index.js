import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"
import { useTranslations } from 'next-intl'
import Locale from "@/components/locale"
import Link from 'next/link'
import { useRouter } from "next/router"

export async function getStaticProps(context) {
  return {
    props: {
      messages: (await import(`./locales/${context.locale}.json`)).default
    }
  }
}

export default function Home({children}) {
  const t = useTranslations()
  const router = useRouter()
  const { locale: activeLocale } = router

  return (
    <>
      <Locale />
      <Link href="/news">News Services FYI Exchange BUY SELL Rate</Link>
      Welcome! <button onClick={() => signOut()}>{t('logout')}</button>
      {children}
    </>
  )
}
