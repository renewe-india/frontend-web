'use client'
import React, { useState } from 'react'
import UsernameForm from './UsernameForm'
import StaticProfileForm from './StaticProfileForm'
import BioAndHeadlineForm from './BioAndHeadlineForm'

// export const metadata = {
//     title: 'Profile Edit',
// }

const ProfileEdit = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        username: 'johndoe',
        gender: 'male',
        date_of_birth: '1990-01-01',
        headline: 'Software Engineer',
        bio: 'Passionate developer with a love for coding.',
    })

    const handleUpdate = updatedData => {
        console.log(updatedData)
        setProfileData(prevData => ({ ...prevData, ...updatedData }))
    }

    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5 ">
                <div className="mb-2">
                    <h2 className="text-2xl font-bold">Profile</h2>
                    <div className="divider my-0" />
                </div>

                <UsernameForm
                    onUpdate={data => handleUpdate(data)}
                    initialData={profileData}
                />
                <StaticProfileForm
                    onUpdate={data => handleUpdate(data)}
                    initialData={profileData}
                />
                <BioAndHeadlineForm
                    onUpdate={data => handleUpdate(data)}
                    initialData={profileData}
                />
            </div>
        </>
    )
}

export default ProfileEdit
