import React from 'react'
import CompanyNavbar from './company-navbar'
import CompanyFooter from './company-footer'

const Layout = ({ children }) => {
    return (
        <div>
            <CompanyNavbar />
            <main id="main-content" className="w-full min-h-screen">
                {children}
            </main>
            <CompanyFooter />
        </div>
    )
}

export default Layout
