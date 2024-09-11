'use client'
import React, { useState } from 'react'
import InputField from '@/components/ui/InputField'
import TextAreaField from '@/components/ui/TextAreaField'
import SubmitButton from '@/components/ui/SubmitButton'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import SuccessDisplay from '@/components/ui/SuccessDisplay'

const BioAndHeadlineForm = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [headline, setHeadline] = useState(user.headline || '')
    const [bio, setBio] = useState(user.bio || '')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await axios.patch(`/api/users/${user.username}`, {
                headline,
                bio,
            })

            if (response.status === 200) {
                setSuccess('Headline and Bio Updated Successfully!')
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
                Update Headline and Bio
            </h3>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 form-control">
                <InputField
                    label="Headline"
                    type="text"
                    name="headline"
                    placeholder="Headline"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    required
                />
                {error && <ErrorDisplay errors={error.headline} />}
                <TextAreaField
                    label="Bio"
                    name="bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Bio"
                    customClass="h-32"
                    required
                />
                {error && <ErrorDisplay errors={error.bio} />}
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Bio & Headline"
                    submittingLabel="Updating Bio & Headline..."
                />
                {success && <SuccessDisplay Success={success} />}
            </form>
        </div>
    )
}

export default BioAndHeadlineForm
