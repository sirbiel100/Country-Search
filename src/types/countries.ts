
type Flags = {
    svg: string
    alt: string
}

export type NativeName = {
    [key: string]: {
        common: string
    }
}

export type Name = {
    common: string
    nativeName: NativeName
}

export type Regions = "Africa" | "America" | "Asia" | "Europe" | "Oceania" | null

export type CountriesType = {
    flags: Flags
    name: Name
    population: number
    region: Regions
    capital: string[]
}
