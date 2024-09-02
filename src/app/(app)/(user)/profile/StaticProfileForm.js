// components/StaticProfileForm.js
import React, { useState } from 'react'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import SubmitButton from '@/components/SubmitButton'
import ErrorDisplay from '@/components/ErrorDisplay'

const StaticProfileForm = ({ onUpdate, initialData }) => {
    const [name, setName] = useState(initialData.name || '')
    const [gender, setGender] = useState(initialData.gender || '')
    const [dateOfBirth, setDateOfBirth] = useState(
        initialData.date_of_birth || '',
    )
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            await onUpdate({ name, gender, dateOfBirth })
        } catch (err) {
            setError('An error occurred while updating profile details.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const genderOptions = ['Male', 'Female', 'Other']

    return (
        <div className="card bg-base-200 rounded-lg p-5 mb-2">
            <h3 className="text-xl font-semibold mb-4">
                Update Profile Details
            </h3>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 form-control">
                <InputField
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <SelectField
                    label="Gender"
                    name="gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    options={genderOptions}
                    required
                />
                <InputField
                    label="Date of Birth"
                    type="date"
                    name="date_of_birth"
                    placeholder="Date of Birth"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    required
                />
                {error && <ErrorDisplay errors={error} />}
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Details"
                    submittingLabel="Updating Details..."
                />
            </form>
        </div>
    )
}

export default StaticProfileForm
