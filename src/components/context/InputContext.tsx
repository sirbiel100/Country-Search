"use client"
import { SetStateAction, useState } from "react"
import { ContextProps } from "../../types/props"
import { createContext } from "react"
import { Regions } from "../../types/countries"

type InputContextType = {
    region: Regions
    setRegion: React.Dispatch<SetStateAction<Regions>>
    inputValue: string
    setInputValue: React.Dispatch<SetStateAction<string>>
}

export const InputContext = createContext<InputContextType>({
    region: null,
    setRegion: () => { },
    inputValue: "",
    setInputValue: () => { },
})

export default function InputContextProvider({children} : ContextProps) {
    const [input, setInput] = useState<string>("")
    const [region, setRegion] = useState<Regions>(null)

    return (
        <InputContext value={{region: region, setRegion: setRegion, inputValue: input, setInputValue: setInput}}>
            {children}
        </InputContext>
    )
}