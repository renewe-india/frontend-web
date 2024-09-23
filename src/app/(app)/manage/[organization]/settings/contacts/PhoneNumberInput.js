'use client'
import React, { useState } from 'react'
import { Plus, SealCheck, Trash } from '@phosphor-icons/react'
import VerificationModal from './VerificationModal'
import axios from '@/lib/axios'
import { useToast } from '@/context/ToastContext'

function PhoneNumberInput({ phoneNumbers, fetchContact, countryCodes, org }) {
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentPhone, setCurrentPhone] = useState(null)
    const [countryCode, setCountryCode] = useState('91')
    const [loading, setLoading] = useState(false)
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

                await axios.post(
                    `/api/organizations/${org}/contacts`,
                    newPhoneData,
                )

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
            await axios.post(`/api/contact/${phone.uuid}/verification/otp/send`)
            setIsModalOpen(true)
        } catch (error) {
            notifyError('Error Sending OTP!')
        }
    }

    const handleVerify = async otp => {
        try {
            await axios.post(
                `/api/contact/${currentPhone.uuid}/verification/otp/verify`,
                {
                    otp: otp,
                    otp_confirmation: otp,
                },
            )

            setIsModalOpen(false)
        } catch (error) {
            notifyError('Error Verifying OTP!')
            setIsModalOpen(false)
        }
    }

    const deletePhoneNumber = async index => {
        const phoneToDelete = phoneNumbers[index]

        try {
            await axios.delete(`/api/organizations/${org}/contacts`, {
                data: { type: 'mobile', number: phoneToDelete.number },
            })
        } catch (error) {
            notifyError('Error deleting phone number:', error)
        }
    }

    return (
        <div>
            <div className="flex items-center mb-4">
                <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    className="input input-bordered w-2/5 lg:w-1/4 mr-2">
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
                    className="input input-bordered w-3/5 lg:w-3/4 mr-2"
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
                        className="flex justify-between items-center mb-2 p-2 border rounded">
                        <div className="flex items-center">
                            <button
                                onClick={() => deletePhoneNumber(index)}
                                className="mr-2 text-red-500">
                                <Trash className="w-5 h-5" />
                            </button>
                            +{phone.country_code}-{phone.data}
                        </div>
                        <div>
                            {phone.is_verified ? (
                                <SealCheck className="w-8 h-8 text-green-600 mr-2" />
                            ) : null}
                        </div>
                        {!phone.verified && (
                            <button
                                onClick={() => toggleVerification(index)}
                                className="btn btn-sm btn-success text-white">
                                Verify
                            </button>
                        )}
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
        </div>
    )
}

export default PhoneNumberInput
