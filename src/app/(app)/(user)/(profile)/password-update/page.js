'use client'
import React, { useState } from 'react'
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import axios from '@/lib/axios'
import SuccessDisplay from '@/components/ui/SuccessDisplay'
import { useRouter } from 'next/navigation'
import MainCard from '@/components/ui/MainCard'
import { ConditionalRender } from '@/lib/utils'

const page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const formData = new FormData(e.target)
        const currentPassword = formData.get('currentPassword')
        const newPassword = formData.get('newPassword')
        const confirmPassword = formData.get('confirmPassword')

        if (newPassword !== confirmPassword) {
            setError({ password: ['Passwords do not match'] })
            setIsSubmitting(false)
            return
        }

        if (newPassword === currentPassword) {
            setError({
                password: ['You cannot use the same password as the old one'],
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
            if (response.status === 204) {
                setSuccess('Password Updated Successfully!')
                setTimeout(() => {
                    setSuccess(null)
                    e.target.reset()
                    router.push('/')
                }, 3000)
            }
        } catch (err) {
            setError(
                err.response?.data?.errors || 'An unexpected error occurred',
            )
            setTimeout(() => setError(null), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <MainCard title={'Change your Password'}>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 form-control">
                <div>
                    <InputField
                        label="Current Password"
                        type="password"
                        name="currentPassword"
                        placeholder="••••••••"
                        required
                    />
                    <ConditionalRender condition={error?.old_password}>
                        <ErrorDisplay errors={error?.old_password} />
                    </ConditionalRender>
                </div>
                <div>
                    <InputField
                        label="New Password"
                        type="password"
                        name="newPassword"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <div>
                    <InputField
                        label="Confirm New Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <ConditionalRender condition={error?.password}>
                    <ErrorDisplay errors={error?.password} />
                </ConditionalRender>
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Password"
                />
                <ConditionalRender condition={success}>
                    <SuccessDisplay success={success} />
                </ConditionalRender>
            </form>
        </MainCard>
    )
}

export default page
