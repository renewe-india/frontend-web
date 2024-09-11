import React from 'react'
import dynamic from 'next/dynamic'

export const metadata = {
    title: 'Profile Edit',
}
const StaticProfileForm = dynamic(() => import('./StaticProfileForm'), {
    loading: () => <p>Loading...</p>,
})
const BioAndHeadlineForm = dynamic(() => import('./BioAndHeadlineForm'), {
    loading: () => <p>Loading...</p>,
})
const ProfileEdit = () => {
    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5 ">
                <div className="mb-2">
                    <h2 className="text-2xl font-bold">Profile</h2>
                    <div className="divider my-0" />
                </div>
                <BioAndHeadlineForm />
                <StaticProfileForm />
            </div>
        </>
    )
}

export default ProfileEdit
