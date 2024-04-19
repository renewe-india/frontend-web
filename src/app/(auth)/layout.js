export const metadata = {
    title: 'Renewe',
}

const Layout = ({ children }) => {
    return (
        <div className="font-sans text-gray-900 antialiased">
            <div className="font-sans antialiased bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
                    <div className="mt-5">
                        <img
                            src="/images/Renewe-logo.png"
                            className="h-8"
                            alt="RenewE Logo"
                        />
                    </div>
                    <div className="w-full sm:max-w-md mt-6 px-6 py-4">
                        <div
                            data-theme="light"
                            className="card bg-base-100 rounded-lg p-5">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
