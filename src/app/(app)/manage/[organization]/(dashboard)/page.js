import React from 'react'

function page({ params }) {
    const organizationName = params.organization
    return (
        <div className="bg-base-100 z-10 p-5 rounded shadow-md">
            Hey! {organizationName}
        </div>
    )
}

export default page
