import Link from 'next/link'
import Image from "next/image"
import Locale from "@/components/locale"
import { useSession, signOut } from "next-auth/react"
import { useTranslations } from 'next-intl'
import { IoMdLogOut } from "react-icons/io"
import { useTheme } from "next-themes"
import { LuSun, LuMoon } from "react-icons/lu"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react"
import { MENU_ITEMS } from '@/lib/config/const'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NavbarLayout() {
    const t = useTranslations('navbar')
    const { data: session, status } = useSession()
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()

    const navigate = url => {
        setIsMenuOpen(false)
        router.push(url)
    }

    return (
        <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll maxWidth="full" classNames={{base: ["bg-transparent"], item: ["data-[active=true]:text-[#e1a249]"], menuItem: ["data-[active=true]:text-[#e1a249]"]}}>
            <NavbarBrand>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden p-4 mr-2" />
                <Link href="/">
                    <Image src="/logo1.png" width={150} height={150} alt="logo" priority={true} className="w-auto h-auto" />
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden lg:flex gap-4" justify="center">
                {MENU_ITEMS.map((item, index) => (
                <NavbarItem key={`${item}-${index}`} isActive={item.href === router.pathname}>
                    <Link href={item.href} className={`py-2 ${item.href == router.pathname ? 'bracketEff-active' : 'bracketEff'}`}>
                        {t(item.name)}
                    </Link>
                </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end" className="gap-1">
                <NavbarItem>
                    {theme == 'light' ?
                        <LuMoon onClick={() => setTheme('dark')} className="text-xl cursor-pointer" />
                        :
                        <LuSun onClick={() => setTheme('light')} className="text-xl cursor-pointer" />
                    }
                </NavbarItem>
                <NavbarItem>
                    <Locale />
                </NavbarItem>
                <NavbarItem>
                <Dropdown className="min-w-36" placement="bottom-end">
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
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {MENU_ITEMS.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`} isActive={item.href === router.pathname}>
                    <div onClick={() => navigate(item.href)} className={`cursor-pointer ${item.href == router.pathname ? 'bracketEff-active' : 'bracketEff'}`}>
                        {t(item.name)}
                    </div>
                </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}