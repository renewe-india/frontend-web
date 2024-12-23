import React from 'react'
import dynamic from 'next/dynamic'
import { getData } from '@/actions/getData'
const CreateOrganizationForm = dynamic(() =>
    import('@/components/organization/CreateOrganizationForm'),
)
const ClaimableBusiness = dynamic(() => import('./ClaimableBusiness'))
const page = async () => {
    const { data: businessesAvailableToClaim } = await getData(
        '/organizations/available-to-claim',
    )
    return (
        <>
            <ClaimableBusiness
                businessesAvailableToClaim={businessesAvailableToClaim}
            />
            <CreateOrganizationForm type="business" />
        </>
    )
}

export default page
