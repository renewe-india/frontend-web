'use client'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import dynamic from 'next/dynamic'
import Heading from '@/components/ui/Heading'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/ui/Loading'
import NoResultFound from '@/components/ui/NoResultFound'

const AddressCard = dynamic(() => import('@/components/cards/AddressCard'), {
    loading: () => <Loading />,
})
const ErrorDisplay = dynamic(() => import('@/components/ui/ErrorDisplay'), {
    ssr: false,
})
const AddAddressModal = dynamic(
    () => import('@/components/modals/AddAddressModal'),
    {
        ssr: false,
    },
)

const Page = () => {
    const [addresses, setAddresses] = useState([])
    const { user } = useAuth({ middleware: 'auth' })
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(
                    `/users/${user.username}/addresses`,
                )
                setAddresses(response.data.data)
            } catch (error) {
                setErrors(error?.response?.data?.errors || [])
            }
        }
        fetchAddresses()
    }, [user.username])

    // Add new address
    const handleAddAddress = async newAddress => {
        try {
            const response = await axios.post(
                `/users/${user.username}/addresses`,
                newAddress,
            )
            setAddresses([...addresses, response.data])
        } catch (error) {
            setErrors(error?.response?.data?.errors || [])
        }
    }

    // Edit address
    const handleEdit = async (uuid, updatedAddress) => {
        try {
            await axios.patch(
                `/users/${user.username}/addresses/${uuid}`,
                updatedAddress,
            )
            setAddresses(prevAddresses =>
                prevAddresses.map(addr =>
                    addr.uuid === uuid ? { ...addr, ...updatedAddress } : addr,
                ),
            )
        } catch (error) {
            setErrors(error?.response?.data?.errors || [])
        }
    }

    // Delete address
    const handleDelete = async uuid => {
        try {
            await axios.delete(`/users/${user.username}/addresses/${uuid}`)
            setAddresses(addresses.filter(addr => addr.uuid !== uuid))
        } catch (error) {
            setErrors(error?.response?.data?.errors || [])
        }
    }

    // Toggle default address
    const handleSetDefault = async uuid => {
        try {
            const address = addresses.find(addr => addr.uuid === uuid)
            await axios.patch(`/users/${user.username}/addresses/${uuid}`, {
                is_default: !address.is_default,
            })
            setAddresses(prevAddresses =>
                prevAddresses.map(addr =>
                    addr.uuid === uuid
                        ? { ...addr, is_default: !addr.is_default }
                        : { ...addr, is_default: false },
                ),
            )
        } catch (error) {
            setErrors(error?.response?.data?.errors || [])
        }
    }

    // Toggle public/private
    const handleSetPublicPrivate = async uuid => {
        try {
            const address = addresses.find(addr => addr.uuid === uuid)
            await axios.patch(`/users/${user.username}/addresses/${uuid}`, {
                is_public: !address.is_public,
            })
            setAddresses(prevAddresses =>
                prevAddresses.map(addr =>
                    addr.uuid === uuid
                        ? { ...addr, is_public: !addr.is_public }
                        : addr,
                ),
            )
        } catch (error) {
            setErrors(error?.response?.data?.errors || [])
        }
    }

    if (!addresses) {
        return <Loading />
    }

    return (
        <>
            <Heading
                title="Addresses"
                buttonName="Add New Address"
                setOpen={() =>
                    document.getElementById('add_address_modal').showModal()
                }>
                <ErrorDisplay errors={errors} />
                {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AddressCard
                            addresses={addresses}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSetDefault={handleSetDefault}
                            onSetPublicPrivate={handleSetPublicPrivate}
                        />
                    </div>
                ) : (
                    <NoResultFound text={'You do not have any address.'} />
                )}
            </Heading>

            <AddAddressModal onSubmit={handleAddAddress} />
        </>
    )
}

export default Page
