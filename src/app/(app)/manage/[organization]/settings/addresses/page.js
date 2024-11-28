'use client'

import React, { useEffect, useState } from 'react'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import AddressCard from '@/components/cards/AddressCard'
import axios from '@/lib/axios'
import Pagination from '@/components/ui/Pagination'
import dynamic from 'next/dynamic'
import Loading from '@/components/ui/Loading'
const AddAddressModal = dynamic(
    () => import('@/components/modals/AddAddressModal'),
    {
        ssr: false,
    },
)

const OrganizationComponent = ({ params }) => {
    const organizationName = params.organization
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [meta, setMeta] = useState(null)
    const [currentPageURL, setCurrentPageURL] = useState(
        `/organizations/${organizationName}/addresses`,
    )

    const fetchAddresses = async url => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(url)
            setAddresses(response.data.data || [])
            setMeta(response.data.meta)
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    `Failed to fetch addresses (${
                        err.response?.status || 'unknown error'
                    })`,
            )
        } finally {
            setLoading(false)
        }
    }
    const handlePageChange = url => {
        setLoading(true)
        setCurrentPageURL(url)
    }
    const handleEdit = address => {
        alert(`Edit Address: ${JSON.stringify(address)}`)
    }
    const handleAddAddress = async newAddress => {
        try {
            const response = await axios.post(
                `/organizations/${organizationName}/addresses`,
                newAddress,
            )
            setAddresses(response.data.data)
            setMeta(response.data.meta)
        } catch (error) {
            setError(error?.response?.data?.errors || [])
        }
    }
    const handleDelete = uuid => {
        alert(`Delete Address UUID: ${uuid}`)
        setAddresses(prev => prev.filter(address => address.uuid !== uuid))
    }

    // Handle Set Default Address
    const handleSetDefault = uuid => {
        setAddresses(prevAddresses =>
            prevAddresses.map(address => ({
                ...address,
                is_default: address.uuid === uuid,
            })),
        )
    }

    // Handle Toggle Public/Private Address
    const handleSetPublicPrivate = uuid => {
        setAddresses(prevAddresses =>
            prevAddresses.map(address =>
                address.uuid === uuid
                    ? { ...address, is_public: !address.is_public }
                    : address,
            ),
        )
    }

    useEffect(() => {
        fetchAddresses(currentPageURL)
    }, [organizationName, currentPageURL])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <TitleCard
                title="Addresses"
                topMargin="mt-2"
                TopSideButton={{
                    onClick: () => {
                        document.getElementById('add_address_modal').showModal()
                    },
                    text: 'Add New',
                }}>
                <div className="container mx-auto lg:p-4">
                    {error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.length > 0 ? (
                                addresses.map((address, id) => (
                                    <AddressCard
                                        key={id}
                                        address={address}
                                        onEdit={() => handleEdit(address)}
                                        onDelete={() =>
                                            handleDelete(address.uuid)
                                        }
                                        onSetDefault={() =>
                                            handleSetDefault(address.uuid)
                                        }
                                        onSetPublicPrivate={() =>
                                            handleSetPublicPrivate(address.uuid)
                                        }
                                    />
                                ))
                            ) : (
                                <div className="text-center text-gray-500">
                                    No addresses found for this organization.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </TitleCard>
            {meta && meta.current_page !== meta.last_page && (
                <Pagination meta={meta} onPageChange={handlePageChange} />
            )}
            <AddAddressModal onSubmit={handleAddAddress} />
        </>
    )
}

export default OrganizationComponent
