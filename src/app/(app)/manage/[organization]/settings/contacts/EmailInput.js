'use client'
import React, { useState } from 'react'
import { Plus, SealCheck, Trash } from '@phosphor-icons/react'
import VerificationModal from './VerificationModal'
import axios from '@/lib/axios'
import { useToast } from '@/context/ToastContext'

function EmailInput({ emails, fetchContact, org }) {
    const [newEmail, setNewEmail] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentEmail, setCurrentEmail] = useState(null)
    const [loading, setLoading] = useState(false)
    const { notifySuccess, notifyError } = useToast()

    const addEmail = async () => {
        if (newEmail && validateEmail(newEmail)) {
            const newEmailData = {
                type: 'email',
                data: newEmail,
            }

            try {
                setLoading(true)
                // Make the API call to add the email
                await axios.post(
                    `/api/organizations/${org}/contacts`,
                    newEmailData,
                )

                setNewEmail('')
                setLoading(false)
                notifySuccess('Email added successfully')
                fetchContact()
            } catch (error) {
                notifyError('Error adding email!')
                setLoading(false)
            }
        } else {
            notifyError('Please enter a valid email address.')
        }
    }

    const validateEmail = email => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const toggleVerification = index => {
        const email = emails[index]
        setCurrentEmail(email)
        sendOtp(email)
    }

    const sendOtp = async email => {
        try {
            await axios.post(`/api/contact/${email.uuid}/verification/otp/send`)
            setIsModalOpen(true)
        } catch (error) {
            notifyError('Error sending OTP!')
        }
    }

    const handleVerify = async otp => {
        try {
            await axios.post(
                `/api/contact/${currentEmail.uuid}/verification/otp/verify`,
                { otp, otp_confirmation: otp },
            )

            setIsModalOpen(false)
            fetchContact()
        } catch (error) {
            notifyError('Error verifying OTP!')
            setIsModalOpen(false)
        }
    }

    const deleteEmail = async index => {
        const emailToDelete = emails[index]

        try {
            await axios.delete(`/api/organizations/${org}/contacts`, {
                data: { type: 'email', data: emailToDelete.email },
            })
            fetchContact()
        } catch (error) {
            notifyError('Error deleting email!')
        }
    }

    return (
        <div>
            <div className="flex items-center mb-4">
                <input
                    type="email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="Add new email"
                    className="input input-bordered w-full mr-2"
                />
                <button
                    onClick={addEmail}
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
                {emails.map((email, index) => (
                    <li
                        key={index}
                        className="flex items-center mb-2 p-2 border rounded">
                        <div className="flex items-center flex-1">
                            <button
                                onClick={() => deleteEmail(index)}
                                className="mr-2 text-red-500">
                                <Trash className="w-5 h-5" />
                            </button>
                            {email.data}
                        </div>
                        <div className="flex-shrink-0">
                            {email.is_verified ? (
                                <SealCheck className="w-8 h-8 text-green-600" />
                            ) : (
                                <button
                                    onClick={() => toggleVerification(index)}
                                    className="btn btn-sm btn-success text-white">
                                    Verify
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            <VerificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onVerify={handleVerify}
                methodType="Email"
                contact={currentEmail?.data}
            />
        </div>
    )
}

export default EmailInput
