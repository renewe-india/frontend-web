import '@/app/global.css'
import ClientThemeWrapper from '@/context/ClientThemeWrapper'
import { ThemeProvider } from '@/context/ThemeContext'

export const metadata = {
    title: 'RenewE',
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="antialiased ">
                <ThemeProvider>
                    <ClientThemeWrapper>{children}</ClientThemeWrapper>
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
