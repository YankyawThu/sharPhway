import Link from 'next/link'
import Image from "next/image"
import Locale from "@/components/locale"
import { useSession, signIn, signOut } from "next-auth/react"
import { useTranslations } from 'next-intl'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react"
import { IoMdLogOut } from "react-icons/io"
import { useTheme } from "next-themes"
import { LuSun, LuMoon } from "react-icons/lu"

export default function Navbar(messages) {
    const t = useTranslations('navbar')
    const { data: session, status } = useSession()
    const { theme, setTheme } = useTheme()

    return (
        <div className="grid grid-cols-3 py-3 px-5 items-center">
            <Link href="/">
                <Image src="/logo1.png" width={200} height={200} alt="logo" className="" />
            </Link>
            <div className="inline-flex justify-center">
                <Link href="/news" className="p-3">{t('news')}</Link>
                <Link href="/fyi" className="p-3">{t('fyi')}</Link>
            </div>
            <div className="flex flex-row-reverse items-center gap-1">
                <Dropdown className="min-w-36">
                    <DropdownTrigger>
                        <Avatar showFallback isBordered as="button" size="md" src={session?.user?.image ?? 'https://images.unsplash.com/broken'} className="ml-1" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" className="">
                        <DropdownItem onClick={signOut} className="">
                            {/* <div className="inline-flex items-center"> */}
                                <IoMdLogOut className="inline text-xl mr-1" /> {t('logout')}
                            {/* </div> */}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Locale />
                {theme == 'light' ?
                    <LuMoon onClick={() => setTheme('dark')} className="text-xl cursor-pointer" />
                    :
                    <LuSun onClick={() => setTheme('light')} className="text-xl cursor-pointer" />
                }
            </div>
        </div>
    )
}