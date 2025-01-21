import '@/app/global.css'
import ClientThemeWrapper from '@/context/ClientThemeWrapper'
import { ThemeProvider } from '@/context/ThemeContext'

export const metadata = {
    title: 'RenewE',
    description:
        'Welcome to RenewE, a platform designed to connect professionals in the renewable energy industry. Our mission is to make the world a greener place by offering innovative and eco-friendly energy products and services.',
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
