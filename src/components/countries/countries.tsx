"use client"
import { useCallback, useContext, useEffect, useState, useRef } from "react" // Import useRef
import { CountriesType } from "../../types/countries"
import { InputContext } from "../context/InputContext"
import { useRouter } from "next/navigation"
import style from "./countries.module.sass"
import CountryCard from "./country/countryCard"
import sortData from "@/hook/sort"
import Loading from "@/app/loading"

const ITEMS_PER_PAGE = 20;

export default function Countries() {
    const [allCountries, setAllCountries] = useState<CountriesType[]>()
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

    const { inputValue, region } = useContext(InputContext)
    const router = useRouter()

    const observer = useRef<IntersectionObserver | null>(null)
    const lastCountryElementRef = useCallback((node: HTMLDivElement) => {
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE)
            }
        })

        if (node) observer.current.observe(node)
    }, [])


    const fetchCountries = useCallback(async () => {
        await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region")
            .then(res => res.json())
            .then(data => {
                sortData(data)
                setAllCountries(data)
            })
    }, [])


    useEffect(() => {
        fetchCountries()
    }, [fetchCountries]) 


    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [inputValue, region]);

    if (!allCountries) return <Loading />

    // Filter countries based on inputValue and region
    const filteredCountries = allCountries.filter((value) =>
        region ?
            (value.region?.toLowerCase().includes(region.toLocaleLowerCase())) && value.name.common.toLowerCase().includes(inputValue.toLowerCase()) :
            value.name.common.toLowerCase().includes(inputValue.toLowerCase())
    )

    const redirectTo = (country: string) => {
        router.push(`/country/${country}`)
    }

    return (
        <main className={style["countries-container"]}>
            {/* Slice the array to only render the visible countries */}
            {filteredCountries.slice(0, visibleCount).map((value, key) => {
                // Check if this is the last element in the *currently visible* list
                const isLastElement = key === visibleCount - 1;

                // If it's the last element, attach the ref to it
                if (isLastElement) {
                    return (
                        <div ref={lastCountryElementRef} key={value.name.common}>
                            <CountryCard
                                country={value}
                                onClick={() => redirectTo(value.name.common)}
                            />
                        </div>
                    );
                } else {
                    return (
                        <CountryCard
                            country={value}
                            key={value.name.common}
                            onClick={() => redirectTo(value.name.common)}
                        />
                    );
                }
            })}

            {/* loading indicator when more items are being added */}
            {visibleCount < filteredCountries.length && <div>Loading more...</div>}
        </main>
    )
}