import ComingSoon from '@/components/ui/ComingSoon'
import Link from 'next/link'
import React from 'react'

function ComingSoonPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-inherit flex flex-col">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <ComingSoon />
                    <Link href="/" className="btn btn-success text-white ">
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ComingSoonPage
