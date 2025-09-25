"use client"

import { Nunito_Sans } from "next/font/google";
import { useContext } from "react";
import { ThemeContext } from "@/components/context/ThemeContext";
import ContextProvider from "@/components/context/ContextProvider";
import Header from "@/components/header/header";
import "./globals.sass";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "600", "800"]
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <ContextProvider>
        <Body>
          <Header />
          {children}
        </Body>
      </ContextProvider>
    </html>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext)

  return (
    <body className={`${nunitoSans.className} ${theme}`}>
      {children}
    </body>
  )
}
