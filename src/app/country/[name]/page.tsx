"use client"

import { CountryDetailsInterface } from "@/types/country"
import { useRouter } from "next/navigation"
import { use, useCallback, useEffect, useState } from "react"
import { filterValue } from "@/hook/filterValue"
import style from "./page.module.sass"
import Image from "next/image"
import backIcon from "../../../../public/arrow-back.svg"
import FormatNumber from "@/hook/formatNumber"
import Loading from "@/app/loading"

export default function CountryPage({
    params,
}: {
    params: Promise<{ name: string }>
}) {

    const [countryDetails, setCountryDetails] = useState<CountryDetailsInterface[]>()
    const [borderCountryName, setBorderCountryName] = useState<CountryDetailsInterface[]>()
    const [loading, setLoading] = useState(false)
    const formatNumber = FormatNumber
    const router = useRouter()
    const { name } = use(params)

    const fetchCountry = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            const data = await res.json()

            setCountryDetails(data)

            const borders = data.flatMap((value: CountryDetailsInterface) => value.borders || [])
            if (borders.length > 0) {
                const resBorders = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(",")}`)
                const dataBorders = await resBorders.json()
                setBorderCountryName(dataBorders)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [name])

    useEffect(() => {
        fetchCountry()
    }, [name])

    if (loading) return <Loading />

    return (
        <section className={style["country-details"]}>


            {countryDetails?.map((value, key) => (
                <main key={key}>
                    <button onClick={() => router.push("/")}>
                        <Image
                            src={backIcon}
                            alt="Back to main page"
                            width={15}
                            height={15}
                        />
                        Back
                    </button>
                    <Image
                        src={value.flags.svg}
                        alt={value.flags.alt ? value.flags.alt : `${value.name.common} Flag`}
                        width={300}
                        height={300}
                    />

                    <div className={style.details}>
                        <h1>{value.name.common}</h1>

                        <div className={style.first}>
                            <p><strong>Native Name: </strong>{filterValue(value.name.nativeName)}</p>
                            <p><strong>Population: </strong>{formatNumber(value.population)}</p>
                            <p><strong>Region: </strong>{value.region}</p>
                            <p><strong>Sub Region: </strong>{value.subregion}</p>
                            <p><strong>Capital: </strong>{filterValue(value.capital)}</p>
                        </div>
                        <div className={style.second}>
                            <p><strong>Top Level Domain: </strong>{filterValue(value.tld)}</p>
                            <p><strong>Currencies: </strong>{filterValue(value.currencies)}</p>
                            <p><strong>Languages: </strong>{filterValue(value.languages)}</p>
                        </div>

                        <div className={style.borderGrid}>
                            <h2>Border Countries:</h2>
                            <div className={style.border}>
                                {borderCountryName
                                    ? borderCountryName.map((country, i) => (
                                        <button key={i} onClick={() => router.push(`/country/${country.name.common}`)}>{country.name.common}</button>
                                    ))
                                    : "N/A"
                                }
                            </div>
                        </div>
                    </div>
                </main>
            ))}
        </section>
    )
}