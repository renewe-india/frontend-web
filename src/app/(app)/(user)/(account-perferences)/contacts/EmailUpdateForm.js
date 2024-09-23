import React, { useState } from 'react'
import { Plus, SealCheck, SealQuestion, Trash } from '@phosphor-icons/react'
import axios from '@/lib/axios'
import VerificationModal from '@/components/ui/VerificationModal'
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal'
import { useAuth } from '@/hooks/auth'

const EmailUpdateForm = ({ emails, fetchContact }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const [newEmail, setNewEmail] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentEmail, setCurrentEmail] = useState(null)
    const [loading, setLoading] = useState(false)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false) // New state

    const addEmail = async () => {
        if (newEmail && validateEmail(newEmail)) {
            const newEmailData = {
                type: 'email',
                data: newEmail,
            }

            try {
                setLoading(true)
                await axios.post(
                    `/users/${user.username}/contacts`,
                    newEmailData,
                )

                setNewEmail('')
                setLoading(false)
                fetchContact()
            } catch (error) {
                setLoading(false)
            }
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
        await axios.post(`/contact/${email.uuid}/verification/otp/send`)
        setIsModalOpen(true)
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
            setIsModalOpen(false)
        }
    }

    const handleDeleteConfirmation = index => {
        const emailToDelete = emails[index]
        console.log(emailToDelete)
        setCurrentEmail(emailToDelete)
        setIsDeleteModalOpen(true)
    }

    const deleteEmail = async () => {
        try {
            await axios.delete(
                `/users/${user.username}/contacts/${currentEmail.uuid}`,
            )
            setIsDeleteModalOpen(false)
            fetchContact()
        } catch (error) {
            setIsDeleteModalOpen(false)
        }
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 mb-2">
            <h3 className="text-xl font-semibold mb-4">Update Email</h3>
            <div className="flex items-center mb-4">
                <input
                    type="email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="Add new email"
                    className="input input-bordered input-primary w-full mr-2"
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
                        className="flex flex-col lg:flex-row items-left lg:items-center bg-base-100 gap-3 mb-2 p-2 border border-primary rounded">
                        <div className="flex items-center flex-1">
                            {email.is_verified ? (
                                <SealCheck className="w-8 h-8 text-green-600 mr-2" />
                            ) : (
                                <SealQuestion className="w-8 h-8 text-red-600 mr-2" />
                            )}
                            {email.data}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            {email.is_verified ? (
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
                methodType="Email"
                contact={currentEmail?.data}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={deleteEmail}
                contact={currentEmail?.data}
            />
        </div>
    )
}

export default EmailUpdateForm
