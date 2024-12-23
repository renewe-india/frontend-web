'use client'
import React, { useEffect, useState } from 'react'
import InputField from '@/components/ui/InputField'
import TextAreaField from '@/components/ui/TextAreaField'
import SubmitButton from '@/components/ui/SubmitButton'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import axios from '@/lib/axios'
import SuccessDisplay from '@/components/ui/SuccessDisplay'
import { useUser } from '@/context/UserContext'

const BioAndHeadlineForm = () => {
    const { user, isLoading } = useUser()
    const [headline, setHeadline] = useState('')
    const [bio, setBio] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        if (!isLoading) {
            setHeadline(user?.headline || '')
            setBio(user?.bio || '')
        }
    }, [user])

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await axios.patch(`/users/${user.username}`, {
                headline,
                bio,
            })

            if (response.status === 200) {
                setSuccess('Headline and Bio Updated Successfully!')
                setTimeout(() => setSuccess(null), 3000)
            }
        } catch (err) {
            setError(err.response?.data.errors)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <h3 className="text-xl font-semibold mb-4">
                Update Headline and Bio
            </h3>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 form-control">
                <div>
                    <InputField
                        label="Headline"
                        type="text"
                        name="headline"
                        placeholder="Headline"
                        value={headline}
                        onChange={e => setHeadline(e.target.value)}
                        required
                    />
                </div>
                <ErrorDisplay
                    errors={error?.headline}
                    onClose={() => setError(null)}
                />
                <TextAreaField
                    label="Bio"
                    name="bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Bio"
                    customClass="h-32"
                    required
                />
                <ErrorDisplay
                    errors={error?.bio}
                    onClose={() => setError(null)}
                />
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Bio & Headline"
                />
                <SuccessDisplay success={success} />
            </form>
        </>
    )
}

export default BioAndHeadlineForm
