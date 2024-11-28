'use client'
import React, { useState } from 'react'
import { Plus, SealCheck, SealQuestion, Trash } from '@phosphor-icons/react'
import axios from '@/lib/axios'
import { useToast } from '@/context/ToastContext'
import VerificationModal from '@/components/modals/VerificationModal'
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal'

function EmailInput({ emails, fetchContact, org }) {
    const [newEmail, setNewEmail] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [currentEmail, setCurrentEmail] = useState(null)
    const [emailToDelete, setEmailToDelete] = useState(null)
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
                await axios.post(`/organizations/${org}/contacts`, newEmailData)

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
            await axios.post(`/contact/${email.uuid}/verification/otp/send`)
            setIsModalOpen(true)
        } catch (error) {
            notifyError('Error sending OTP!')
        }
    }

    const handleVerify = async otp => {
        try {
            await axios.post(
                `/contact/${currentEmail.uuid}/verification/otp/verify`,
                { otp, otp_confirmation: otp },
            )

            setIsModalOpen(false)
            fetchContact()
        } catch (error) {
            notifyError('Error verifying OTP!')
            setIsModalOpen(false)
        }
    }

    const confirmDeleteEmail = index => {
        setEmailToDelete(emails[index])
        setIsDeleteModalOpen(true)
    }

    const deleteEmail = async () => {
        if (emailToDelete) {
            try {
                await axios.delete(
                    `/organizations/${org}/contacts/${emailToDelete.uuid}`,
                )
                fetchContact()
                notifySuccess('Email deleted successfully')
            } catch (error) {
                notifyError('Error deleting email!')
            } finally {
                setIsDeleteModalOpen(false)
            }
        }
    }

    return (
        <div className="card bg-base-100 rounded-lg mb-5">
            <h3 className="text-xl font-semibold mb-4">Manage Emails</h3>
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
                        className="flex flex-col lg:flex-row items-left lg:items-center gap-3 mb-2 p-2 bg-base-200 border border-primary rounded">
                        <div className="flex items-center flex-1">
                            {email.is_verified ? (
                                <SealCheck className="w-8 h-8 text-green-600 mr-2" />
                            ) : (
                                <SealQuestion className="w-8 h-8 text-red-600 mr-2" />
                            )}
                            {email.data}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            {!email.is_verified && (
                                <button
                                    onClick={() => toggleVerification(index)}
                                    className="btn btn-sm btn-success text-white">
                                    Verify
                                </button>
                            )}
                            <button
                                onClick={() => confirmDeleteEmail(index)}
                                className="btn btn-sm bg-red-600 text-white flex items-center">
                                <Trash className="w-5 h-5" />
                                Delete
                            </button>
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

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={deleteEmail}
                contact={emailToDelete?.data}
            />
        </div>
    )
}

export default EmailInput
