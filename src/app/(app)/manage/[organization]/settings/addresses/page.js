'use client'
import React, { useEffect, useState } from 'react'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import AddressCard from '@/components/cards/AddressCard'

const OrganizationComponent = ({ params }) => {
    const organizationName = params.organization
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)
    const defaultAddresses = [
        {
            uuid: '1',
            type: 'Office',
            name: 'Headquarters',
            line_1: '123 Main Street',
            line_2: 'Suite 500',
            country: 'USA',
            state: 'California',
            is_default: true,
            is_public: true,
            tax_name: 'Example Corp',
            tax_number: '123-456-789',
        },
        {
            uuid: '2',
            type: 'Branch',
            name: 'New York Office',
            line_1: '456 Park Ave',
            line_2: '',
            country: 'USA',
            state: 'New York',
            is_default: false,
            is_public: true,
            tax_name: 'Example Corp',
            tax_number: '123-456-789',
        },
        {
            uuid: '3',
            type: 'Warehouse',
            name: 'Main Warehouse',
            line_1: '789 Industrial Blvd',
            line_2: 'Unit 2B',
            country: 'USA',
            state: 'Texas',
            is_default: false,
            is_public: false,
            tax_name: 'Example Corp',
            tax_number: '123-456-789',
        },
    ]
    //  const getApiUrl = () => `/organizations/${organizationName}/addresses`

    // const fetchAddresses = async () => {
    //     setLoading(true)
    //     setError(null)
    //     try {
    //         const response = await axios.get(getApiUrl())
    //         setAddresses(response.data.data)
    //     } catch (error) {
    //         setError(
    //             error.response?.data?.message ||
    //             `Failed to fetch addresses (${error.response?.status || 'unknown error'})`
    //         )
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    const handleEdit = async address => {
        alert(address)
    }

    const handleDelete = async uuid => {
        alert(uuid)
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

    useEffect(() => {
        setAddresses(defaultAddresses)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [organizationName])
    return (
        <TitleCard
            title="Addresses"
            topMargin={'mt-2'}
            TopSideButtonLink={{ text: 'create New', href: '' }}>
            <div className="container mx-auto lg:p-4">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AddressCard
                            addresses={addresses}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSetDefault={handleSetDefault}
                            onSetPublicPrivate={handleSetPublicPrivate}
                        />
                    </div>
                )}
                {/* {error && (
                    <div className="text-center text-red-500">{error}</div>
                )} */}
            </div>
        </TitleCard>
    )
}

export default OrganizationComponent
