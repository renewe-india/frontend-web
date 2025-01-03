import React from 'react'
import dynamic from 'next/dynamic'
import { getData } from '@/actions/getData'
const CreateOrganizationForm = dynamic(() =>
    import('@/components/organization/CreateOrganizationForm'),
)
const ClaimableBusiness = dynamic(() => import('./ClaimableBusiness'))
const page = async () => {
    const { data: claimableBusinesses } = await getData(
        '/organizations/available-to-claim',
    )

    return (
        <div className="space-y-2">
            <ClaimableBusiness claimableBusinesses={claimableBusinesses} />
            <CreateOrganizationForm type="business" />
        </div>
    )
}

export default page
