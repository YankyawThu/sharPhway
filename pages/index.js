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

export default function Home() {
  const t = useTranslations()
  const router = useRouter()

  return (
    <>
    </>
  )
}
