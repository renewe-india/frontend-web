import React from 'react'
import ProfileSettings from './ProfileSettings'
import { getServerSideProps } from './ProfileServerProps'

export default async function ProfileSettingsPage() {
    const {
        companySizeOptions,
        companyTypeOptions,
    } = await getServerSideProps()

    return (
        <div>
            <ProfileSettings
                companySizeOptions={companySizeOptions}
                companyTypeOptions={companyTypeOptions}
            />
        </div>
    )
}
