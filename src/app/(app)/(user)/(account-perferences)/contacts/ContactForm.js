'use client'
import React, { useState } from 'react'
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import SuccessDisplay from '@/components/ui/SuccessDisplay'

const ContactForm = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [email, setEmail] = useState(user.email || '')
    const [phone, setPhone] = useState(user.phone || '')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await axios.patch(`/api/users/${user.username}`, {
                email,
                phone,
            })

            if (response.status === 200) {
                setSuccess('Contact Information Updated Successfully!')
                setTimeout(() => setSuccess(null), 3000)
            }
        } catch (err) {
            setError(err.response.data.errors)
            setTimeout(() => setError(null), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 mb-2">
            <h3 className="text-xl font-semibold mb-4">
                Update Contact Information
            </h3>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 form-control">
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                {error && <ErrorDisplay errors={error.email} />}
                <InputField
                    label="Phone"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                />
                {error && <ErrorDisplay errors={error.phone} />}
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Contact Information"
                    submittingLabel="Updating Contact Information..."
                />
                {success && <SuccessDisplay Success={success} />}
            </form>
        </div>
    )
}

export default ContactForm
