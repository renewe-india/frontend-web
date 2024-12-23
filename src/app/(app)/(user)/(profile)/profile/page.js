import React from 'react'
import dynamic from 'next/dynamic'
import MainCard from '@/components/ui/MainCard'

export const metadata = {
    title: 'Profile Edit',
}
const StaticProfileForm = dynamic(() => import('./StaticProfileForm'))
const BioAndHeadlineForm = dynamic(() => import('./BioAndHeadlineForm'))
const ProfileEdit = () => {
    return (
        <div className="space-y-2">
            <MainCard title={'Profile'}>
                <BioAndHeadlineForm />
            </MainCard>
            <MainCard>
                <StaticProfileForm />
            </MainCard>
        </div>
    )
}

export default ProfileEdit
