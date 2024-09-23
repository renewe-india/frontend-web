'use client'
import React, { useState } from 'react'
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import SuccessDisplay from '@/components/ui/SuccessDisplay'
import { useRouter } from 'next/navigation'

const UsernameForm = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [username, setUsername] = useState(user.username || '')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const router = useRouter()
    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await axios.patch(`/user/update/username`, {
                username,
            })

            if (response.status === 204) {
                setSuccess('Username Updated Successfully!')
                setTimeout(() => setSuccess(null), 3000)
                setTimeout(() => router.push('/'), 4000)
            }
        } catch (err) {
            setError(err.response.data.errors)
            setTimeout(() => setError(null), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 form-control">
                <InputField
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                {error && <ErrorDisplay errors={error.username} />}
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Username"
                    submittingLabel="Updating Username..."
                />
                {success && <SuccessDisplay Success={success} />}
            </form>
        </div>
    )
}

export default UsernameForm
