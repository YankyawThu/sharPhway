import "@/styles/globals.css"

import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from "@nextui-org/react"
import {ThemeProvider as NextThemesProvider} from "next-themes"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}