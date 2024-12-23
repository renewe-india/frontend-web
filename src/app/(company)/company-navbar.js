import Image from '@/components/Image'
import React from 'react'

export default function CompanyNavbar() {
    const ReneweLogo = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_LOGO}`
    return (
        <div
            className="navbar bg-base-100 fixed z-40 shadow"
            style={{
                borderBottom: '2px solid',
                borderImage: 'linear-gradient(to right, #009A00, #FF6600) 1',
            }}>
            <div className="flex justify-center w-full">
                <a href="/" className="btn btn-ghost text-xl">
                    <Image src={ReneweLogo} alt="RenewE Logo" className="h-5" />
                </a>
            </div>
        </div>
    )
}
