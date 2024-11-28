import React, { useState } from 'react'
import { Plus, SealCheck, Trash, SealQuestion } from '@phosphor-icons/react'
import axios from '@/lib/axios'
import { useToast } from '@/context/ToastContext'
import VerificationModal from '@/components/modals/VerificationModal'
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal'

function PhoneNumberInput({ phoneNumbers, fetchContact, countryCodes, org }) {
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentPhone, setCurrentPhone] = useState(null)
    const [countryCode, setCountryCode] = useState('91')
    const [loading, setLoading] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const { notifySuccess, notifyError } = useToast()

    const addPhoneNumber = async () => {
        if (newPhoneNumber) {
            const newPhoneData = {
                type: 'mobile',
                country_code: countryCode,
                data: newPhoneNumber,
            }

            try {
                setLoading(true)

                await axios.post(`/organizations/${org}/contacts`, newPhoneData)

                setNewPhoneNumber('')
                setLoading(false)
                notifySuccess('Phone number added successfully')
                fetchContact()
            } catch (error) {
                notifyError('Failed to add phone number')
                setLoading(false)
            }
        }
    }

    const toggleVerification = index => {
        const phone = phoneNumbers[index]
        setCurrentPhone(phone)
        sendOtp(phone)
    }

    const sendOtp = async phone => {
        try {
            await axios.post(`/contact/${phone.uuid}/verification/otp/send`)
            setIsModalOpen(true)
        } catch (error) {
            notifyError('Error Sending OTP!')
        }
    }

    const handleVerify = async otp => {
        try {
            await axios.post(
                `/contact/${currentPhone.uuid}/verification/otp/verify`,
                {
                    otp: otp,
                    otp_confirmation: otp,
                },
            )

            fetchContact()
        } catch (error) {
            notifyError('Error Verifying OTP!')
        } finally {
            setIsModalOpen(false)
            setCurrentPhone(null)
        }
    }

    const deletePhoneNumber = async () => {
        try {
            await axios.delete(
                `/organizations/${org}/contacts/${currentPhone.uuid}`,
            )
            fetchContact()
            notifySuccess('Phone number deleted successfully')
        } catch (error) {
            notifyError('Error deleting phone number:', error)
        } finally {
            setCurrentPhone(null)
            setIsDeleteModalOpen(false)
        }
    }

    const confirmDeletePhoneNumber = index => {
        const phone = phoneNumbers[index]
        setCurrentPhone(phone)
        setIsDeleteModalOpen(true)
    }

    return (
        <div className="card bg-base-100 rounded-lg  mb-5">
            <h3 className="text-xl font-semibold mb-4">Manage Phone Numbers</h3>
            <div className="flex items-center mb-4">
                <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    className="input input-bordered  w-2/5 lg:w-1/4 mr-2">
                    {countryCodes.map(code => (
                        <option key={code.code} value={code.code}>
                            +{code.code} : {code.country}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={newPhoneNumber}
                    onChange={e => setNewPhoneNumber(e.target.value)}
                    placeholder="Add new phone number"
                    className="input input-bordered  w-3/5 lg:w-3/4 mr-2"
                />
                <button
                    onClick={addPhoneNumber}
                    className="btn btn-primary"
                    disabled={loading}>
                    {loading ? (
                        'Adding...'
                    ) : (
                        <Plus className="w-5 h-5" weight="bold" />
                    )}
                </button>
            </div>
            <ul>
                {phoneNumbers.map((phone, index) => (
                    <li
                        key={index}
                        className="flex flex-col lg:flex-row items-left lg:items-center gap-3 justify-between bg-base-200 mb-2 p-2 border border-primary rounded">
                        <div className="flex items-center">
                            <div>
                                {phone.is_verified ? (
                                    <SealCheck className="w-8 h-8 text-green-600 mr-2" />
                                ) : (
                                    <SealQuestion className="w-8 h-8 text-red-600 mr-2" />
                                )}
                            </div>
                            +{phone.country_code}-{phone.data}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            {!phone.is_verified && (
                                <button
                                    onClick={() => toggleVerification(index)}
                                    className="btn btn-sm btn-success text-white">
                                    Verify
                                </button>
                            )}
                            <button
                                onClick={() => confirmDeletePhoneNumber(index)}
                                className="btn btn-sm bg-red-600 text-white mr-2 flex items-center">
                                <Trash className="w-5 h-5" />
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <VerificationModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setCurrentPhone(null)
                }}
                onVerify={handleVerify}
                methodType="Phone Number"
                contact={currentPhone?.data}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false)
                    setCurrentPhone(null)
                }}
                onConfirm={deletePhoneNumber}
                contact={currentPhone?.data}
            />
        </div>
    )
}

export default PhoneNumberInput
