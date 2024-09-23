import VerificationModal from '@/components/ui/VerificationModal'
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { Plus, SealCheck, Trash, SealQuestion } from '@phosphor-icons/react'
import React, { useState } from 'react'

const PhoneNumberUpdateForm = ({
    phoneNumbers,
    fetchContact,
    countryCodes,
}) => {
    const { user } = useAuth({ middleware: 'auth' })
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentPhone, setCurrentPhone] = useState(null)
    const [countryCode, setCountryCode] = useState('91')
    const [loading, setLoading] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const addPhoneNumber = async () => {
        if (newPhoneNumber) {
            const newPhoneData = {
                type: 'mobile',
                country_code: countryCode,
                data: newPhoneNumber,
            }

            try {
                setLoading(true)

                await axios.post(
                    `/users/${user.username}/contacts`,
                    newPhoneData,
                )

                setNewPhoneNumber('')
                setLoading(false)
                fetchContact()
            } catch (error) {
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
        await axios.post(`/contact/${phone.uuid}/verification/otp/send`)
        setIsModalOpen(true)
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

            setIsModalOpen(false)
            fetchContact()
        } catch (error) {
            setIsModalOpen(false)
        }
    }

    const handleDeleteConfirmation = index => {
        const phoneToDelete = phoneNumbers[index]
        setCurrentPhone(phoneToDelete)
        setIsDeleteModalOpen(true)
    }

    const deletePhoneNumber = async () => {
        try {
            await axios.delete(
                `/users/${user.username}/contacts/${currentPhone.uuid}`,
            )
            setIsDeleteModalOpen(false)
            fetchContact()
        } catch (error) {
            setIsDeleteModalOpen(false)
        }
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 mb-2">
            <h3 className="text-xl font-semibold mb-4">Update Phone Number</h3>
            <div className="flex items-center mb-4">
                <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    className="input input-bordered input-primary w-2/5 lg:w-1/4 mr-2">
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
                    className="input input-bordered input-primary w-3/5 lg:w-3/4 mr-2"
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
                        className="flex flex-col lg:flex-row items-left lg:items-center gap-3 bg-base-100 justify-between mb-2 p-2 border border-primary rounded">
                        <div className="flex items-center">
                            {phone.is_verified ? (
                                <SealCheck className="w-8 h-8 text-green-600 mr-2" />
                            ) : (
                                <SealQuestion className="w-8 h-8 text-red-600 mr-2" />
                            )}
                            +{phone.country_code}-{phone.data}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            {phone.is_verified ? (
                                <div />
                            ) : (
                                <button
                                    onClick={() => toggleVerification(index)}
                                    className="btn btn-sm btn-success text-white">
                                    Verify
                                </button>
                            )}
                            <button
                                onClick={() => handleDeleteConfirmation(index)}
                                className="btn btn-sm bg-red-600 text-white mr-2 flex items-center">
                                <Trash className="w-5 h-5" /> Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <VerificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onVerify={handleVerify}
                methodType="Phone Number"
                contact={currentPhone?.data}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={deletePhoneNumber}
                contact={currentPhone?.data}
            />
        </div>
    )
}

export default PhoneNumberUpdateForm
