import { useRouter } from "next/router"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react"

export default function Locale() {
    const router = useRouter()
    const { locales, locale: activeLocale } = router

    let otherLocales = (locales || []).map(
        (locale) => {
            if(locale !== activeLocale) {
                return {key: locale, label:locale}
            }
        }
    )

    otherLocales = (otherLocales || []).filter(
        locale => locale != undefined
    )

    const changeLocale = (locale) => {
        const { pathname, query, asPath } = router
        router.push({pathname, query}, asPath, { locale })
    }

    return (
        <div>
            <Dropdown className="min-w-10">
                <DropdownTrigger>
                    <Button variant="bordered" className="min-w-10 uppercase">
                        {activeLocale}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={otherLocales}>
                    {(item) => (
                        <DropdownItem
                            key={item.key}
                            onClick={() => changeLocale(item.label)}
                            className="uppercase"
                        >
                            {item.label}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
