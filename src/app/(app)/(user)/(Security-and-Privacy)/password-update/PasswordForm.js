'use client'
import React, { useState } from 'react'
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import axios from '@/lib/axios'
import SuccessDisplay from '@/components/ui/SuccessDisplay'
import { useRouter } from 'next/navigation'

const PasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const router = useRouter()
    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        if (newPassword !== confirmPassword) {
            setError({ password: ['Passwords do not match'] })
            setIsSubmitting(false)
            return
        }
        if (newPassword === currentPassword) {
            setError({
                password: ['You cannot put Same Password as Old Password'],
            })
            setIsSubmitting(false)
            return
        }

        try {
            const response = await axios.patch(`/password/update`, {
                old_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            })

            if (response.status === 200) {
                setSuccess('Password Updated Successfully!')
                setTimeout(() => setSuccess(null), 3000)
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
            }
        } catch (err) {
            setError(err.response.data.errors)
            setTimeout(() => setError(null), 3000)
        } finally {
            setIsSubmitting(false)
            router.push('/login')
        }
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 form-control">
                <InputField
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                />
                {error?.old_password && (
                    <div>
                        <ErrorDisplay errors={error.old_password} />
                    </div>
                )}
                <InputField
                    label="New Password"
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <InputField
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
                {error?.password && (
                    <div>
                        <ErrorDisplay errors={error.password} />
                    </div>
                )}
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Password"
                    submittingLabel="Updating Password..."
                />
                {success && <SuccessDisplay Success={success} />}
            </form>
        </div>
    )
}

export default PasswordForm
