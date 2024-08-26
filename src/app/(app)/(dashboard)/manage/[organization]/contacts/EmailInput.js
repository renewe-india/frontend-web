import React, { useState } from 'react'
import { Plus, SealCheck, Trash } from '@phosphor-icons/react'
import VerificationModal from './VerificationModal'

function EmailInput({ emails, updateEmails }) {
    const [newEmail, setNewEmail] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentEmail, setCurrentEmail] = useState(null)

    // Function to add a new email if it's valid
    const addEmail = () => {
        if (newEmail && validateEmail(newEmail)) {
            updateEmails([...emails, { email: newEmail, verified: false }])
            setNewEmail('')
        } else {
            alert('Please enter a valid email address.')
        }
    }

    // Function to validate email format
    const validateEmail = email => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    // Function to trigger the OTP sending and open the modal
    const toggleVerification = index => {
        const email = emails[index]
        setCurrentEmail(email)
        sendOtp(email.email)
    }

    const sendOtp = async () => {
        // console.log(email)
        setIsModalOpen(true)
    }

    const handleVerify = async () => {
        // console.log(otp)
        setIsModalOpen(false)
    }

    const deleteEmail = index => {
        const updatedEmails = emails.filter((_, i) => i !== index)
        updateEmails(updatedEmails)
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
                <button onClick={addEmail} className="btn btn-primary">
                    <Plus className="w-5 h-5" weight="bold" />
                </button>
            </div>
            <ul>
                {emails.map((email, index) => (
                    <li
                        key={index}
                        className="flex items-center mb-2 p-2 border rounded "
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                        <div className="flex items-center flex-1 min-w-0">
                            <button
                                onClick={() => deleteEmail(index)}
                                className="mr-2 text-red-500">
                                <Trash className="w-5 h-5" />
                            </button>
                            <span className="truncate">{email.email}</span>
                        </div>
                        <div className="flex-shrink-0">
                            {email.verified ? (
                                <SealCheck className="w-8 h-8 text-green-600 mr-2" />
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
                contact={currentEmail?.email}
            />
        </div>
    )
}

export default EmailInput
