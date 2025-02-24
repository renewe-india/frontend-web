import React, { useState } from 'react'
import { Plus, SealCheck, SealQuestion } from '@phosphor-icons/react'
import axios from '@/lib/axios'
import { useUser } from '@/context/UserContext'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import DeleteButton from '@/components/ui/DeleteButton'
import VerifyButton from '@/components/ui/VerifyButton'
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton'
import { ConditionalRender, cn } from '@/lib/utils'

const EmailUpdateForm = ({
    emails,
    fetchContact,
    onVerify,
    onDeleteRequest,
    handleSendOtp,
}) => {
    const { user } = useUser()
    const [newEmail, setNewEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleAddEmail = async e => {
        e.preventDefault()
        setError(null)
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
                fetchContact()
            } catch (error) {
                setError(error?.response?.data?.errors)
            } finally {
                setLoading(false)
            }
        } else {
            setError('Please enter a valid email address.')
        }
    }

    const validateEmail = email => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const sendOtp = async uuid => {
        await handleSendOtp(uuid)
    }

    const handleDelete = phone => {
        onDeleteRequest(phone)
    }

    return (
        <>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Email
            </h3>
            <ConditionalRender condition={error}>
                <ErrorDisplay errors={error} onClose={() => setError(null)} />
            </ConditionalRender>
            <form onSubmit={handleAddEmail} className="flex items-center mb-4">
                <InputField
                    type="email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="Add new email"
                    className="input input-bordered input-primary w-full mr-2"
                />
                <SubmitButton
                    isSubmitting={loading}
                    type="submit"
                    className="btn btn-primary">
                    <Plus className="w-5 h-5" weight="bold" />
                </SubmitButton>
            </form>
            <ul>
                {emails.map((email, index) => (
                    <ConditionalRender key={index} condition={email}>
                        <li
                            className={cn(
                                'flex flex-col lg:flex-row items-left lg:items-center bg-base-100 gap-3 mb-2 p-2 border border-gray-600 rounded',
                            )}>
                            <div className="flex items-center flex-1 min-w-0">
                                <ConditionalRender
                                    condition={email.is_otp_verified}>
                                    <SealCheck
                                        className="w-8 h-8 text-green-600 mr-2 flex-shrink-0"
                                        weight="fill"
                                    />
                                </ConditionalRender>
                                <ConditionalRender
                                    condition={!email.is_otp_verified}>
                                    <SealQuestion
                                        className="w-8 h-8 mr-2 flex-shrink-0"
                                        weight="fill"
                                    />
                                </ConditionalRender>
                                <span className="truncate block">
                                    {email.data}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <ConditionalRender
                                    condition={!email.is_otp_verified}>
                                    <VerifyButton
                                        itemName={email.data}
                                        sendOtp={async () =>
                                            await sendOtp(email.uuid)
                                        }
                                        methodType={'Email'}
                                        onVerify={otp => onVerify(otp, email)}
                                    />
                                </ConditionalRender>
                                <DeleteButton
                                    itemName={`${email.data}`}
                                    onDelete={() => handleDelete(email)}
                                    style="bg-red-600 text-white flex items-center mr-2"
                                />
                            </div>
                        </li>
                    </ConditionalRender>
                ))}
            </ul>
        </>
    )
}

export default EmailUpdateForm
