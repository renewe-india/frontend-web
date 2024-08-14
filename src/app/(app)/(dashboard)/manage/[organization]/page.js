import React from 'react'

function page({ params }) {
    const organizationName = params.organization
    return <div className="bg-base-100 z-10 shadow-md">{organizationName}</div>
}

export default page
