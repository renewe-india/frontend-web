import React from 'react'
import dynamic from 'next/dynamic'
import Heading from '@/components/ui/Heading'

export const metadata = {
    title: 'Profile Edit',
}
const StaticProfileForm = dynamic(() => import('./StaticProfileForm'))
const BioAndHeadlineForm = dynamic(() => import('./BioAndHeadlineForm'))
const ProfileEdit = () => {
    return (
        <Heading title={'Profile'}>
            <BioAndHeadlineForm />
            <StaticProfileForm />
        </Heading>
    )
}

export default ProfileEdit
