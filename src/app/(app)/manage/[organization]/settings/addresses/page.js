'use client'

import React, { useEffect, useState } from 'react'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import AddressCard from '@/components/cards/AddressCard'
import axios from '@/lib/axios'
import Pagination from '@/components/ui/Pagination'
import dynamic from 'next/dynamic'
import Loading from '@/components/ui/Loading'
import { useToast } from '@/context/ToastContext'

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
    const [addressToEdit, setAddressToEdit] = useState(null)
    const { notifySuccess, notifyError } = useToast()

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
        setCurrentPageURL(url)
    }

    const handleAddAddress = async newAddress => {
        try {
            const response = await axios.post(
                `/organizations/${organizationName}/addresses`,
                newAddress,
            )
            setAddresses(prev => [...prev, response.data.data])
            notifySuccess('Address added successfully!')
        } catch (error) {
            notifyError(
                error?.response?.data?.errors || 'Failed to add address.',
            )
        }
    }

    const handleEditAddress = async updatedAddress => {
        try {
            await axios.patch(
                `/organizations/${organizationName}/addresses/${updatedAddress.uuid}`,
                updatedAddress,
            )
            setAddresses(prev =>
                prev.map(addr =>
                    addr.uuid === updatedAddress.uuid
                        ? { ...addr, ...updatedAddress }
                        : addr,
                ),
            )
            notifySuccess('Address updated successfully!')
        } catch (error) {
            notifyError(
                error?.response?.data?.errors || 'Failed to update address.',
            )
        }
    }
    const handleDelete = async uuid => {
        try {
            await axios.delete(
                `/organizations/${organizationName}/addresses/${uuid}`,
            )
            setAddresses(prev => prev.filter(address => address.uuid !== uuid))
            notifySuccess('Address deleted successfully!')
        } catch (error) {
            notifyError(
                error?.response?.data?.errors || 'Failed to delete address.',
            )
        }
    }

    const handleSetDefault = (() => {
        let isRequestPending = false

        return async uuid => {
            if (isRequestPending) return

            isRequestPending = true
            try {
                const address = addresses.find(addr => addr.uuid === uuid)
                setAddresses(prev =>
                    prev.map(addr => ({
                        ...addr,
                        is_default:
                            addr.uuid === uuid
                                ? !addr.is_default
                                : addr.is_default,
                    })),
                )
                await axios.patch(
                    `/organizations/${organizationName}/addresses/${uuid}`,
                    {
                        is_default: !address.is_default,
                    },
                )

                notifySuccess('Address default status updated successfully!')
            } catch (error) {
                notifyError(
                    error?.response?.data?.errors ||
                        'Failed to update default status.',
                )
            } finally {
                isRequestPending = false
            }
        }
    })()
    const handleSetPublicPrivate = (() => {
        let isRequestPending = false

        return async uuid => {
            if (isRequestPending) return

            isRequestPending = true
            try {
                const address = addresses.find(addr => addr.uuid === uuid)
                setAddresses(prev =>
                    prev.map(addr =>
                        addr.uuid === uuid
                            ? { ...addr, is_public: !addr.is_public }
                            : addr,
                    ),
                )
                await axios.patch(
                    `/organizations/${organizationName}/addresses/${uuid}`,
                    {
                        is_public: !address.is_public,
                    },
                )

                notifySuccess('Address visibility updated successfully!')
            } catch (error) {
                notifyError(
                    error?.response?.data?.errors ||
                        'Failed to update visibility.',
                )
            } finally {
                isRequestPending = false
            }
        }
    })()

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
            {meta && meta.last_page === 1 && (
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
