import "@/styles/globals.css"

import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from "@nextui-org/react"
import {ThemeProvider as NextThemesProvider} from "next-themes"
import {NextIntlClientProvider} from 'next-intl'
import {useRouter} from 'next/router'
import Layout from '@/components/layout'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()

  return (
    <NextIntlClientProvider locale={router.locale} messages={pageProps.messages}>
      <NextUIProvider>
        <NextThemesProvider attribute="class">
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </NextIntlClientProvider>
  )
}