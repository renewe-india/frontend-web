// components/UsernameForm.js
import React, { useState } from 'react'
import InputField from '@/components/InputField'
import SubmitButton from '@/components/SubmitButton'
import ErrorDisplay from '@/components/ErrorDisplay'

const UsernameForm = ({ onUpdate, initialData }) => {
    const [username, setUsername] = useState(initialData.username || '')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            // Replace this with your actual update logic
            await onUpdate({ username })
        } catch (err) {
            setError('An error occurred while updating the username.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 mb-2">
            <h3 className="text-xl font-semibold mb-4">Update Username</h3>
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
                {error && <ErrorDisplay errors={error} />}
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Username"
                    submittingLabel="Updating Username..."
                />
            </form>
        </div>
    )
}

export default UsernameForm
