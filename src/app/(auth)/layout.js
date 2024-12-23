import GlobalCompactFooter from '@/components/ui/GlobalCompactFooter'

export const metadata = {
    title: 'Renewe',
}

const Layout = ({ children }) => {
    return (
        <div className="font-sans antialiased ">
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-base-100 lg:bg-base-200">
                <div className="mt-5">
                    <img
                        src="/images/Renewe-logo.png"
                        className="h-8"
                        alt="RenewE Logo"
                    />
                </div>
                <div className="w-full sm:max-w-md mt-6 px-6 py-4">
                    <div className="card bg-base-100 rounded-lg p-5">
                        {children}
                    </div>
                    <GlobalCompactFooter />
                </div>
            </div>
        </div>
    )
}

export default Layout
