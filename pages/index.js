import Image from "next/image"
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from "next/router"
import { useEffect, useState, useReducer, useCallback } from "react"
import { fetchExchanges } from '@/lib/api/exchange'
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti"
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6"
import { PiApproximateEquals } from "react-icons/pi"
import {Tabs, Tab, Card, CardBody, Slider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react"
import { timeDiffFromDate } from '@/lib/utils/helper'

export async function getStaticProps(context) {
  return {
    props: {
      messages: (await import(`@/pages/locales/${context.locale}.json`)).default
    }
  }
}

export default function Home() {
  const [exchanges, setExchanges] = useState({})
  const [filterMmk, setFilterMmk] = useState(100000)
  const [filteredResult, setFilteredResult] = useState(0)
  const [filterMmkSell, setFilterMmkSell] = useState(100000)
  const [filteredResultSell, setFilteredResultSell] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const t = useTranslations('home')
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async() => {
    try {
        const data = await fetchExchanges()
        setExchanges(data)
        setFilterMmk(data.last.base_amount)
        setFilteredResult(data.last.buy)
        setFilterMmkSell(data.last.base_amount)
        setFilteredResultSell(data.last.sell)
    } catch (error) {
        setError('Something was wrong')
    } finally {
        setLoading(false)
    }
  }

  const priceFilter = val => {
    setFilterMmk(val)
    setFilteredResult(parseInt(exchanges.last.buy * (val/exchanges.last.base_amount)))
  }

  const priceFilterSell = val => {
    setFilterMmkSell(val)
    setFilteredResultSell(parseInt(exchanges.last.sell * (val/exchanges.last.base_amount)))
  }

  const columns = [
    {
      key: "rateSign",
      label: "",
    },
    {
      key: "buy",
      label: "buy",
    },
    {
      key: "sell",
      label: "sell",
    },
    {
      key: "createdAt",
      label: "time",
    }
  ]

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey]

    const rateSign = (item) => {
      let sign = ''
      exchanges.lastTen.map((exchange, i) => {
        if(exchange.id == item.id) {
          let key = i == exchanges.lastTen.length-1 ? i : i+1
          if(item.sell >= exchanges.lastTen[key].sell) {
            sign = <FaArrowTrendUp className="m-auto text-2xl text-green-500" />
          }
          else {
            sign = <FaArrowTrendDown className="m-auto text-2xl text-red-500" />
          }
        }
      })
      return sign
    }

    switch (columnKey) {
      case "buy": return cellValue
      case "sell": return cellValue
      case "rateSign": return rateSign(item)
      case "createdAt": return timeDiffFromDate(cellValue)
    }
  })

  return (
    <>
      <div className="bg my-10">
        <div className="text-[40px] text-center pb-10">{t('header')}</div>
        <div className="flex justify-center w-full mt-5">
          <div className="flex flex-row items-end gap-5">
            <div className="w-80 border-1 dark:border-gray-400 border-gray-600 p-5 rounded-2xl">
              <Tabs aria-label="Options" size="sm" radius="full">
                <Tab key="buy" title={t('buy')}>
                  <Card>
                    <CardBody className="bg-[#f4f4f5] dark:bg-[#27272a]">
                      <div className="flex justify-between"> 
                        <div className="flex flex-col gap-4">
                          <div className="text-gray-500">{t('youGive')}</div>
                          <Image src="/baht.png" width="30" height="30" alt="baht" />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="inline-flex justify-end items-center">
                            {exchanges?.down ? <TiArrowDownThick className="text-red-500" />:<TiArrowUpThick className="text-green-500" />}
                            <div className="text-gray-500 ml-1">
                              {exchanges?.last?.buy}
                            </div>
                          </div>
                          <div className="text-2xl inline-flex items-center"><PiApproximateEquals className="mr-1 text-sm" />{filteredResult}</div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="text-center text-xs text-gray-400 dark:text-gray-600 py-3">{t('lastupdatedTime')}: {timeDiffFromDate(exchanges?.last?.createdAt)}</div>
                  <Card>
                    <CardBody className="bg-[#f4f4f5] dark:bg-[#27272a]">
                      <div className="flex justify-between"> 
                        <div className="flex flex-col gap-4">
                          <div className="text-gray-500">{t('youReceive')}</div>
                          <Image src="/mmk.png" width="30" height="30" alt="mmk" />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="text-right text-gray-500">{exchanges?.last?.base_amount}</div>
                          <div className="text-right text-2xl">{filterMmk}</div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Slider
                    size="sm"
                    step={50000}
                    maxValue={2000000}
                    minValue={50000}
                    aria-label="mmk"
                    defaultValue={100000}
                    className="max-w-md mt-2"
                    color="warning"
                    value={filterMmk}
                    onChange={val => priceFilter(val)}
                  />
                </Tab>
                <Tab key="sell" title={t('sell')}>
                  <Card>
                    <CardBody className="bg-[#f4f4f5] dark:bg-[#27272a]">
                      <div className="flex justify-between"> 
                        <div className="flex flex-col gap-4">
                          <div className="text-gray-500">{t('youReceive')}</div>
                          <Image src="/baht.png" width="30" height="30" alt="baht" />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="inline-flex justify-end items-center">
                            {exchanges?.down ? <TiArrowDownThick className="text-red-500" />:<TiArrowUpThick className="text-green-500" />}
                            <div className="text-gray-500 ml-1">
                              {exchanges?.last?.sell}
                            </div>
                          </div>
                          <div className="text-2xl inline-flex items-center"><PiApproximateEquals className="mr-1 text-sm" />{filteredResultSell}</div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="text-center text-xs text-gray-400 dark:text-gray-600 py-3">{t('lastupdatedTime')}: {timeDiffFromDate(exchanges?.last?.createdAt)}</div>
                  <Card>
                    <CardBody className="bg-[#f4f4f5] dark:bg-[#27272a]">
                      <div className="flex justify-between"> 
                        <div className="flex flex-col gap-4">
                          <div className="text-gray-500">{t('youGive')}</div>
                          <Image src="/mmk.png" width="30" height="30" alt="mmk" />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="text-right text-gray-500">{exchanges?.last?.base_amount}</div>
                          <div className="text-right text-2xl">{filterMmkSell}</div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Slider
                    size="sm"
                    step={50000}
                    maxValue={2000000}
                    minValue={50000}
                    aria-label="mmk"
                    defaultValue={100000}
                    className="max-w-md mt-2"
                    color="warning"
                    value={filterMmkSell}
                    onChange={val => priceFilterSell(val)}
                  />
                </Tab>
              </Tabs>
            </div>
            <div className="flex flex-col gap-5">
              <div className="w-52 flex flex-col rounded-2xl border-1 dark:border-gray-400 border-gray-600 text-lg">
                <div className="p-5 text-gray-500">{t('mmk')} / {t('baht')}</div>
                <div className="p-3"></div>
                <div className="p-5 flex justify-between items-center">
                  <div className="">{parseInt((1 / exchanges?.last?.buy) * exchanges?.last?.base_amount)} {t('mmk')}</div>
                  <div className="text-xs bg-blue-50 dark:bg-[#0c1737] border border-blue-500 text-blue-500 p-2 rounded-lg">{t('buy')}</div>
                </div>
              </div>
              <div className="w-52 flex flex-col rounded-2xl border-1 dark:border-gray-400 border-gray-600 text-lg">
                <div className="p-5 text-gray-500">{t('mmk')} / {t('baht')}</div>
                <div className="p-3"></div>
                <div className="p-5 flex justify-between items-center">
                  <div className="">{parseInt((1 / exchanges?.last?.sell) * exchanges?.last?.base_amount)} {t('mmk')}</div>
                  <div className="text-xs bg-red-50 dark:bg-[#2e0a0a] border border-red-500 text-red-500 p-2 rounded-lg">{t('sell')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="text-[40px] text-center py-10">{t('header2')}</div>
        <div className="m-10 mt-5">
          <Table aria-label="Dynamic content" layout="fixed" fullWidth removeWrapper className="border-1 dark:border-gray-400 border-gray-600 rounded-2xl p-5">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key} className="text-lg text-center py-5">{t(column.label)}</TableColumn>}
            </TableHeader>
            {exchanges?.lastTen ?
            <TableBody emptyContent={"No rows to display."} items={exchanges.lastTen}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell className="text-lg text-center text-black dark:text-white py-5">{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
            :
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            }
          </Table>
        </div>
      </div>
    </>
  )
}
