import Link from 'next/link'
import React from 'react'
import TemplatePointers from './TemplatePointers'
function page({ params }) {
    const organizationName = params.organization
    return (
        <div className="hero h-4/5 bg-base-200">
            <div className="hero-content">
                <div className="max-w-md">
                    <TemplatePointers />
                    <Link href={`/manage/${organizationName}/profile`}>
                        <button className="mt-5 btn bg-base-100 btn-outline">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page
