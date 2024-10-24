import React from 'react'
import NavbarGuest from './NavbarGuest'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div>
            <NavbarGuest />
            <main id="main-content" className="w-full min-h-screen">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
