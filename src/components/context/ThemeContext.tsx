"use client"
import { SetStateAction, useEffect, useState } from "react"
import { ContextProps } from "../../types/props"
import { createContext } from "react"

export type Theme = "light" | "dark"

type ThemeContextType = {
    theme: Theme
    setTheme: React.Dispatch<SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    setTheme: () => { },
})

export default function ThemeContextProvider({children} : ContextProps) {
    const [themeColor, setThemeColor] = useState<Theme>("light")

    useEffect(() => {
        const themeStorage = localStorage.getItem("theme") as Theme

        const checkLocalStorage = () => {
            return themeStorage ? setThemeColor(themeStorage) : null
        }

        checkLocalStorage()
    }, [])

    return (
        <ThemeContext value={{theme: themeColor, setTheme: setThemeColor}}>
            {children}
        </ThemeContext>
    )
}