'use client'

import React, { useEffect, useState } from 'react'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import AddressCard from '@/components/cards/AddressCard'
import axios from '@/lib/axios'
import Pagination from '@/components/ui/Pagination'
import dynamic from 'next/dynamic'
import Loading from '@/components/ui/Loading'

const AddAddressModal = dynamic(() =>
    import('@/components/modals/AddAddressModal'),
)
const NoResultFound = dynamic(() => import('@/components/ui/NoResultFound'))
const ErrorDisplay = dynamic(() => import('@/components/ui/ErrorDisplay'))

const OrganizationComponent = ({ params }) => {
    const organizationName = params.organization
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState([])
    const [meta, setMeta] = useState(null)
    const [currentPageURL, setCurrentPageURL] = useState(
        `/organizations/${organizationName}/addresses`,
    )
    const [addressToEdit, setAddressToEdit] = useState(null) // Track address being edited

    const fetchAddresses = async url => {
        setLoading(true)
        setError([])
        try {
            const response = await axios.get(url)
            setAddresses(response.data.data || [])
            setMeta(response.data.meta)
        } catch (err) {
            setError(err.response?.data?.message || [])
        } finally {
            setLoading(false)
        }
    }

    const handlePageChange = url => {
        setLoading(true)
        setCurrentPageURL(url)
    }

    const handleAddAddress = async newAddress => {
        try {
            await axios.post(
                `/organizations/${organizationName}/addresses`,
                newAddress,
            )
            fetchAddresses(currentPageURL)
        } catch (error) {
            setError(error?.response?.data?.errors || [])
        }
    }

    const handleEditAddress = async updatedAddress => {
        try {
            await axios.patch(
                `/organizations/${organizationName}/addresses/${updatedAddress.uuid}`,
                updatedAddress,
            )
            fetchAddresses(currentPageURL)
        } catch (error) {
            setError(error?.response?.data?.errors || [])
        }
    }

    const handleDelete = uuid => {
        alert(`Delete Address UUID: ${uuid}`)
        setAddresses(prev => prev.filter(address => address.uuid !== uuid))
    }

    const handleSetDefault = async uuid => {
        setLoading(true)
        try {
            const address = addresses.find(addr => addr.uuid === uuid)
            await axios.patch(
                `/organizations/${organizationName}/addresses/${uuid}`,
                {
                    is_default: !address.is_default,
                },
            )
            fetchAddresses()
        } catch (error) {
            setError(error?.response?.data?.errors || [])
        } finally {
            setLoading(false)
        }
    }

    const handleSetPublicPrivate = async uuid => {
        setLoading(true)
        try {
            const address = addresses.find(addr => addr.uuid === uuid)
            await axios.patch(
                `/organizations/${organizationName}/addresses/${uuid}`,
                {
                    is_public: !address.is_public,
                },
            )
            fetchAddresses()
        } catch (error) {
            setError(error?.response?.data?.errors || [])
        } finally {
            setLoading(false)
        }
    }

    const handleOpenModal = (address = null) => {
        setAddressToEdit(address)
        document.getElementById('add_address_modal').showModal()
    }

    const handleCloseModal = () => {
        setAddressToEdit(null)
        document.getElementById('add_address_modal').close()
    }
    useEffect(() => {
        fetchAddresses(currentPageURL)
    }, [organizationName, currentPageURL])

    return (
        <>
            <TitleCard
                title="Addresses"
                topMargin="mt-2"
                TopSideButton={{
                    onClick: () => handleOpenModal(),
                    text: 'Add New',
                }}>
                <div className="container mx-auto lg:p-4">
                    <ErrorDisplay errors={error} />
                    {!loading ? (
                        addresses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addresses.map(address => (
                                    <AddressCard
                                        key={address.uuid}
                                        address={address}
                                        onEdit={() => handleOpenModal(address)} // Open modal for editing
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
                                ))}
                            </div>
                        ) : (
                            <NoResultFound
                                text={'You do not have any address.'}
                            />
                        )
                    ) : (
                        <Loading />
                    )}
                </div>
            </TitleCard>
            {meta && meta.current_page !== meta.last_page && (
                <Pagination meta={meta} onPageChange={handlePageChange} />
            )}
            <AddAddressModal
                address={addressToEdit}
                onSubmit={addressToEdit ? handleEditAddress : handleAddAddress}
                onClose={handleCloseModal}
            />
        </>
    )
}

export default OrganizationComponent
