'use client'
import React from 'react'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import AddressCard from './AddressCard'

const OrganizationComponent = () => {
    return (
        <TitleCard title="Addresses" topMargin={'mt-2'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AddressCard />
                <AddressCard />
                <AddressCard />
            </div>
        </TitleCard>
    )
}

export default OrganizationComponent
