"use client"
import Image from "next/image"
import MoonIcon from "../../../public/moon-icon.svg"
import MoonIconFill from "../../../public/moon-icon-fill.svg"
import style from "./header.module.sass"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function Header() {
    const { theme, setTheme } = useContext(ThemeContext)
    const themeDescription = theme === "light" ? "Dark Mode" : "Light Mode"

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }
    return (
        <header className={style.header}>
            <nav>
                <p>Where in the world?</p>
                <div onClick={() => toggleTheme()}>
                    <Image src={theme === "light" ? MoonIcon : MoonIconFill} alt={themeDescription} />
                    <p>{themeDescription}</p>
                </div>
            </nav>
        </header>
    )
}