'use client'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import dynamic from 'next/dynamic'
import MainCard from '@/components/ui/MainCard'
import Loading from '@/components/ui/Loading'
import NoResultFound from '@/components/ui/NoResultFound'
import AddAddressModal from '@/components/modals/AddAddressModal'
import { useUser } from '@/context/UserContext'

const AddressCard = dynamic(() => import('@/components/cards/AddressCard'), {
    loading: () => <Loading />,
})
const ErrorDisplay = dynamic(() => import('@/components/ui/ErrorDisplay'))

const AddressPage = () => {
    const [addresses, setAddresses] = useState([])
    const { user } = useUser()
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])
    const [addressToEdit, setAddressToEdit] = useState(null)

    const fetchAddresses = async () => {
        setErrors([])
        setLoading(true)
        try {
            const response = await axios.get(
                `/users/${user.username}/addresses`,
            )
            setAddresses(response.data.data)
        } catch (error) {
            setErrors(error?.response?.data?.errors)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) fetchAddresses()
    }, [user?.username])

    const handleAddAddress = async newAddress => {
        setLoading(true)
        try {
            const response = await axios.post(
                `/users/${user.username}/addresses`,
                newAddress,
            )
            setAddresses(prev => [...prev, response.data.data])
        } catch (error) {
            setErrors(error?.response?.data?.errors)
        } finally {
            setLoading(false)
        }
    }

    const handleEditAddress = async updatedAddress => {
        setLoading(true)
        try {
            await axios.patch(
                `/users/${user.username}/addresses/${updatedAddress.uuid}`,
                updatedAddress,
            )
            setAddresses(prev =>
                prev.map(addr =>
                    addr.uuid === updatedAddress.uuid
                        ? { ...addr, ...updatedAddress }
                        : addr,
                ),
            )
        } catch (error) {
            setErrors(error?.response?.data?.errors || [])
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteAddress = async uuid => {
        setLoading(true)
        try {
            await axios.delete(`/users/${user.username}/addresses/${uuid}`)
            setAddresses(prev => prev.filter(addr => addr.uuid !== uuid))
        } catch (error) {
            setErrors(error?.response?.data?.errors || [])
        } finally {
            setLoading(false)
        }
    }

    const handleSetDefault = async uuid => {
        setLoading(true)
        try {
            const address = addresses.find(addr => addr.uuid === uuid)
            await axios.patch(`/users/${user.username}/addresses/${uuid}`, {
                is_default: !address.is_default,
            })
            setAddresses(prev =>
                prev.map(addr => ({
                    ...addr,
                    is_default: addr.uuid === uuid ? !addr.is_default : false,
                })),
            )
        } catch (error) {
            setErrors(error?.response?.data?.errors || [])
        } finally {
            setLoading(false)
        }
    }

    const handleSetPublicPrivate = async uuid => {
        setLoading(true)
        try {
            const address = addresses.find(addr => addr.uuid === uuid)
            await axios.patch(`/users/${user.username}/addresses/${uuid}`, {
                is_public: !address.is_public,
            })
            setAddresses(prev =>
                prev.map(addr =>
                    addr.uuid === uuid
                        ? { ...addr, is_public: !addr.is_public }
                        : addr,
                ),
            )
        } catch (error) {
            setErrors(error?.response?.data?.errors || [])
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

    return (
        <>
            <MainCard
                title="Addresses"
                buttonName="Add New Address"
                setOpen={() => handleOpenModal()}>
                <ErrorDisplay errors={errors} />
                {!loading ? (
                    addresses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.map(address => (
                                <AddressCard
                                    key={address.uuid}
                                    address={address}
                                    onEdit={() => handleOpenModal(address)}
                                    onDelete={handleDeleteAddress}
                                    onSetDefault={handleSetDefault}
                                    onSetPublicPrivate={handleSetPublicPrivate}
                                />
                            ))}
                        </div>
                    ) : (
                        <NoResultFound text={'You do not have any address.'} />
                    )
                ) : (
                    <Loading />
                )}
            </MainCard>

            <AddAddressModal
                address={addressToEdit}
                onSubmit={addressToEdit ? handleEditAddress : handleAddAddress}
                onClose={handleCloseModal}
            />
        </>
    )
}

export default AddressPage
