'use client'
import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const localTheme = localStorage.getItem('theme')
        if (localTheme) {
            setTheme(localTheme ? localTheme : 'light')
        }
    }, [])

    // if (!mounted)
    //     return (
    //         <>
    //             <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 ">
    //                 Loading...
    //             </div>
    //         </>
    //     )

    const toggleTheme = theme => {
        setTheme(theme)
        localStorage.setItem('theme', theme)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
