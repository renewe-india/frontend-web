import React, { useState } from 'react'
import InputField from '@/components/InputField'
import TextAreaField from '@/components/TextAreaField'
import SubmitButton from '@/components/SubmitButton'
import ErrorDisplay from '@/components/ErrorDisplay'

const BioAndHeadlineForm = ({ onUpdate, initialData }) => {
    const [headline, setHeadline] = useState(initialData.headline || '')
    const [bio, setBio] = useState(initialData.bio || '')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            await onUpdate({ headline, bio })
        } catch (err) {
            setError('An error occurred while updating bio and headline.')
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
                <TextAreaField
                    label="Bio"
                    name="bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Bio"
                    customClass="h-32"
                    required
                />
                {error && <ErrorDisplay errors={error} />}
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Bio & Headline"
                    submittingLabel="Updating Bio & Headline..."
                />
            </form>
        </div>
    )
}

export default BioAndHeadlineForm
