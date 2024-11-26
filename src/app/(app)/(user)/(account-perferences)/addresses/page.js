'use client'
import React, { useState } from 'react'
import Heading from '@/components/ui/Heading'
import AddAddressModal from './AddAddressModal'
import AddressCard from '@/components/cards/AddressCard'

const Page = () => {
    const [addresses, setAddresses] = useState([
        {
            uuid: '1',
            type: 'Home',
            name: 'John Doe',
            line_1: '123 Main St',
            line_2: 'Apt 4B',
            country: 'United States',
            state: 'California',
            is_default: true,
            is_public: false,
        },
        {
            uuid: '2',
            type: 'Work',
            name: 'Jane Smith',
            line_1: '456 Corporate Blvd',
            line_2: 'Suite 200',
            country: 'United States',
            state: 'New York',
            is_default: false,
            is_public: true,
        },
        {
            uuid: '3',
            type: 'Other',
            name: 'Family Home',
            line_1: '789 Elm Street',
            country: 'United States',
            state: 'Texas',
            is_default: false,
            is_public: false,
        },
    ])

    const handleAddAddress = newAddress => {
        setAddresses([
            ...addresses,
            { ...newAddress, uuid: Date.now().toString() },
        ])
    }

    const handleEdit = () => {
        // Implement edit logic
        //console.log('Edit', address)
    }

    const handleDelete = uuid => {
        setAddresses(addresses.filter(addr => addr.uuid !== uuid))
    }

    const handleSetDefault = async uuid => {
        setAddresses(prevAddresses =>
            prevAddresses.map(address =>
                address.uuid === uuid
                    ? { ...address, is_default: !address.is_default }
                    : address,
            ),
        )
    }

    const handleSetPublicPrivate = async uuid => {
        setAddresses(prevAddresses =>
            prevAddresses.map(address =>
                address.uuid === uuid
                    ? { ...address, is_public: !address.is_public }
                    : address,
            ),
        )
    }

    return (
        <>
            <Heading
                title="Addresses"
                buttonName="Add New Address"
                setOpen={() =>
                    document.getElementById('add_address_modal').showModal()
                }>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AddressCard
                        addresses={addresses}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSetDefault={handleSetDefault}
                        onSetPublicPrivate={handleSetPublicPrivate}
                    />
                </div>
            </Heading>

            <AddAddressModal onSubmit={handleAddAddress} />
        </>
    )
}

export default Page
