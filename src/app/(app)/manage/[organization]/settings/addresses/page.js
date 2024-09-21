'use client'
import React, { useState } from 'react'
import OrganizationAddressTable from './OrganizationAddressTable'
import TitleCard from '@/components/dashboard/Cards/TitleCard'

const organizationAddresses = [
    {
        location: 'New York',
        contactPerson: 'John Doe',
        phone: '123-456-7890',
        address: '123 Main St, New York, NY 10001',
    },
    // Add more locations
]

const OrganizationComponent = () => {
    const [addresses, setAddresses] = useState(organizationAddresses)

    const handleEdit = address => {
        alert('Editing address: ', address)
        // Add logic to handle editing
    }

    return (
        <TitleCard title="Addresses" topMargin={'mt-2'}>
            <OrganizationAddressTable
                addresses={addresses}
                onEdit={handleEdit}
            />
        </TitleCard>
    )
}

export default OrganizationComponent
