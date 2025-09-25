"use client"
import Image from "next/image";
import SearchIcon from "../../../public/search-icon.svg"
import style from "./inputs.module.sass"
import { useContext, useEffect, useState } from "react";
import { InputContext } from "@/components/context/InputContext";
import { CountriesType, Regions } from "@/types/countries";

export default function Inputs() {
    const { setRegion, region, inputValue, setInputValue } = useContext(InputContext)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [countries, setCountries] = useState<CountriesType[]>([])

    const ChangeRegion = (region: Regions) => {
        setRegion(region)
        setIsChecked(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://restcountries.com/v3.1/all?fields=name,region")
                .then(res => res.json())
                .then(data => setCountries(data));
        }
        fetchData()

        setInputValue("")
    }, [])

    const filteredCountriesOnDatalist = countries.filter((value) =>
        region ?
            (value.region?.toLowerCase().includes(region.toLocaleLowerCase())) && value.name.common.toLowerCase().includes(inputValue.toLowerCase())
            :
            value.name.common.toLowerCase().includes(inputValue.toLowerCase())
    )

    return (
        <section className={style.inputs}>
            <label>
                <Image src={SearchIcon} alt="Search for a country" />
                <input
                    list="countries"
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search for a country..."
                />
                {/*list of countries*/}
                <datalist id="countries">
                    {filteredCountriesOnDatalist.map((value, key) => (
                        <option value={value.name.common} key={key} />
                    ))}
                </datalist>
            </label>

            <div className={style.customSelect}>
                <input type="checkbox" name="customSelect" id="customSelect" checked={isChecked} readOnly />
                <label htmlFor="customSelect" onClick={() => isChecked ? setIsChecked(false) : setIsChecked(true)}>
                    {!region && "Filter By Region"}
                    {region && region}
                </label>
                <ul>
                    <li onClick={() => ChangeRegion("Africa")}>Africa</li>
                    <li onClick={() => ChangeRegion("America")}>America</li>
                    <li onClick={() => ChangeRegion("Asia")}>Asia</li>
                    <li onClick={() => ChangeRegion("Europe")}>Europe</li>
                    <li onClick={() => ChangeRegion("Oceania")}>Oceania</li>
                    <li onClick={() => ChangeRegion(null)}>None</li>
                </ul>
            </div>
        </section>
    )
}