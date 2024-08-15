import { useState, useEffect } from "react"
import { timeDiffFromDate } from '@/lib/utils/helper'
import { Swiper, SwiperSlide} from 'swiper/react'
import { IoMdTime } from "react-icons/io"
import Image from "next/image"
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import { Pagination, Autoplay, EffectFade } from 'swiper/modules'

export default function NewsDetail({news = null}) {
    const renderHtml = news?.content

    useEffect(() => {
        document.getElementById('content').innerHTML = news?.content
    }, [news])

    return (
        <div>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                modules={[Pagination, Autoplay, EffectFade]}
                className="relative w-full h-[400px] rounded-2xl"
            >

                {news?.img1 ? <SwiperSlide><Image src={news?.img1} quality={100} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit: "contain"}} priority={true} alt="news" className="w-auto h-auto bg-white dark:bg-black" /></SwiperSlide> : <></>}
                {news?.img2 ? <SwiperSlide><Image src={news?.img2} quality={100} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit: "contain"}} priority={true} alt="news" className="w-auto h-auto bg-white dark:bg-black" /></SwiperSlide> : <></>}
                {news?.img3 ? <SwiperSlide><Image src={news?.img3} quality={100} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit: "contain"}} priority={true} alt="news" className="w-auto h-auto bg-white dark:bg-black" /></SwiperSlide> : <></>}
                {news?.img4 ? <SwiperSlide><Image src={news?.img4} quality={100} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit: "contain"}} priority={true} alt="news" className="w-auto h-auto bg-white dark:bg-black" /></SwiperSlide> : <></>}
                {news?.img5 ? <SwiperSlide><Image src={news?.img5} quality={100} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit: "contain"}} priority={true} alt="news" className="w-auto h-auto bg-white dark:bg-black" /></SwiperSlide> : <></>}
            </Swiper>
            <div className="flex justify-between py-5">
                <div className="text-lg">{news?.title}</div>
                <div className="inline-flex justify-end items-center w-56 gap-2 text-gray-500"><IoMdTime className="text-lg" />{timeDiffFromDate(news?.createdAt)}</div>
            </div>
            <div className="my-3 leading-7 tracking-wide align-middle dark:text-gray-400 text-gray-600" id="content">
            </div>
        </div>
    )
}