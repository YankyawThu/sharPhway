import { useTranslations } from 'next-intl'
import { timeDiffFromDate } from '@/lib/utils/helper'
import { fetchFacts } from '@/lib/api/facts'
import { useState } from 'react'
import {Accordion, AccordionItem, Input} from "@nextui-org/react"
import parse from 'html-react-parser'
import Image from "next/image"
import { FaRegHandPointLeft } from "react-icons/fa"
import { CiSearch } from "react-icons/ci"

export async function getStaticProps(context) {
    const data = await fetchFacts()
    return {
        props: {
            messages: (await import(`@/pages/locales/${context.locale}.json`)).default,
            data
        }
    }
}

export default function Facts({data}) {
    const [facts, setFacts] = useState(data)
    const t = useTranslations('facts')

    const filteredFacts = async (val) => {
        const filteredArray = await fetchFacts(val)
        setFacts(filteredArray)
    }

    return (
        <div className="flex justify-center my-5">
            <div className="w-[1000px]">
                <Input onValueChange={(val) => filteredFacts(val)} isClearable radius="lg" fullWidth={false} startContent={<CiSearch className="text-xl text-gray-500 group-data-[focus=true]:text-black dark:group-data-[focus=true]:text-white" />} placeholder={t('search')} classNames={{inputWrapper:["bg-transparent", "w-80", "shadow-md", "shadow-yellow-500/50", "h-12", "group-data-[hover=true]:bg-default-200/50", "group-data-[focus=true]:bg-default-200/50", "m-auto", "mb-5"]}} />
                <Accordion fullWidth={false}>
                    {facts.map(fact => (
                        <AccordionItem key={fact.id} startContent={<Image src="/logo1.svg" alt="icon" width={23} height={23} />} subtitle={<div className="py-1">{t('lastupdatedTime')}: {timeDiffFromDate(fact.updatedAt)}</div>} indicator={<FaRegHandPointLeft className="text-xl" />} aria-label={fact.title} title={fact.title} classNames={{content: "leading-6 tracking-wide dark:text-gray-400 text-gray-600 pb-7"}}>
                            {parse(fact.content)}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}