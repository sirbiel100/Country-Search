import { CountriesType } from "@/types/countries";
import Image from "next/image";
import style from "./country.module.sass"
import FormatNumber from "@/hook/formatNumber";

type CountryProps = {
    country: CountriesType
    onClick: () => void
}

export default function CountryCard({ country, onClick }: CountryProps) {
    const formatNumber = FormatNumber

    return (
        <section className={style.country} onClick={onClick}>
            <div className={style.flags}>
                <Image src={country.flags.svg} alt={country.flags.alt} width={300} height={200} loading="lazy" />
            </div>
            <div className={style.description}>
                <h3>{country.name.common}</h3>
                <p><strong>Population:</strong> {formatNumber(country.population)}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital}</p>
            </div>
        </section>
    )
}