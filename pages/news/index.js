import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { timeDiffFromDate } from '@/lib/utils/helper'
import { fetchNews } from '@/lib/api/news'
import NewsDetail from "@/components/newsDetail"
import {ScrollShadow} from "@nextui-org/react"
import Image from "next/image"
import { IoMdTime } from "react-icons/io"
import { Button } from '@nextui-org/react'

export async function getStaticProps(context) {
    const {data, totalPages} = await fetchNews()

    return {
        props: {
            messages: (await import(`@/pages/locales/${context.locale}.json`)).default,
            data,
            totalPages
        }
    }
}

export default function News({data, totalPages}) {
    const [news, setNews] = useState(data)
    const [detail, setDetail] = useState(data[0])
    const [active, setActive] = useState(data[0].id)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [pages, setPages] = useState(totalPages)
    const [page, setPage] = useState(0)
    const t = useTranslations('news')

    const loadData = async() => {
        try {
            let tempPage = page + 1
            const {data} = await fetchNews(tempPage)
            setNews([...news, ...data])
            setPage(prevstate => prevstate + 1)
        } catch (error) {
            setError('Something was wrong')
        } finally {
            setLoading(false)
        }
    }

    const goDetail = news => {
        setDetail(news)
        setActive(news.id)
    }

    return (
        <div className="flex justify-center py-3">
            <div className="flex flex-row gap-3">
                <ScrollShadow hideScrollBar size={10} className="w-80 p-3 h-screen">
                    {news?.map((item, i) => (
                        <div onClick={() => goDetail(item)} className={`inline-flex gap-2 my-1 p-3 rounded-xl ${item.id == active ? 'outline outline-gray-700' : ''} hover:outline hover:outline-gray-700 cursor-pointer`} key={item.id}>
                            <Image src={item?.img1} width={70} height={70} style={{objectFit: "contain"}} alt="news" priority={true} className="w-[100px] h-auto rounded-xl" />
                            <div>
                                <div className="inline-flex items-center gap-1 text-xs text-gray-500 py-2"><IoMdTime className="text-lg" />{timeDiffFromDate(item.createdAt)}</div>
                                <div className="inline-flex items-start gap-1 my-2"><Image src="/logo1.svg" alt="icon" width={20} height={20} className="mt-1" /><span className="line-clamp-3 text-[12px]">{item.title}</span></div>
                            </div>
                        </div>
                    ))}
                    
                    {page < pages ? 
                        <div className="m-auto text-center my-2">
                            <Button onClick={loadData} size="sm" variant="flat">Load more</Button>
                        </div>
                        :
                        <></>
                    }
                </ScrollShadow>
                <div className="w-[700px] p-3">
                    <NewsDetail news={detail} />
                </div>
            </div>
        </div>
    )
}