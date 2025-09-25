import InputContextProvider from "./InputContext"
import ThemeContextProvider from "./ThemeContext"
import { ContextProps } from "../../types/props"


export default function ContextProvider({ children }: ContextProps) {


    return (
        <ThemeContextProvider>
            <InputContextProvider>
                {children}
            </InputContextProvider>
        </ThemeContextProvider>
    )
}