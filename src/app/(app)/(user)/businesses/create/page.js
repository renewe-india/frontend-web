import React from 'react'
import dynamic from 'next/dynamic'
const CreateOrganizationForm = dynamic(() =>
    import('@/components/organization/CreateOrganizationForm'),
)
const ClaimableBusiness = dynamic(() => import('./ClaimableBusiness'))
const BusinessCreate = () => {
    return (
        <>
            <ClaimableBusiness />
            <CreateOrganizationForm type="business" />
        </>
    )
}

export default BusinessCreate
