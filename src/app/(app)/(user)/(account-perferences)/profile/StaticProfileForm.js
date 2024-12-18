'use client'
import React, { useEffect, useState } from 'react'
import InputField from '@/components/ui/InputField'
import SelectField from '@/components/ui/SelectField'
import SubmitButton from '@/components/ui/SubmitButton'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import axios from '@/lib/axios'
import SuccessDisplay from '@/components/ui/SuccessDisplay'
import useFetchOptions from '@/hooks/useFetchOptions'
import { useUser } from '@/context/UserContext'

const StaticProfileForm = () => {
    const { user, isLoading } = useUser()
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const genderOptions = useFetchOptions('/enums/Main/Gender')

    useEffect(() => {
        if (!isLoading) {
            setName(user?.name)
            setGender(user?.gender)
            setDateOfBirth(user?.date_of_birth)
        }
    }, [user])

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await axios.patch(`/users/${user.username}`, {
                name,
                gender,
                dateOfBirth,
            })

            if (response.status === 200) {
                setSuccess('Profile Updated Successfully!')
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
                {error && <ErrorDisplay errors={error.name} />}
                <SelectField
                    label="Gender"
                    name="gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    options={genderOptions}
                    required
                />
                {error && <ErrorDisplay errors={error.gender} />}
                <InputField
                    label="Date of Birth"
                    type="date"
                    name="date_of_birth"
                    placeholder="Date of Birth"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    required
                />
                {error && <ErrorDisplay errors={error.date_of_birth} />}
                {error && <ErrorDisplay errors={error} />}
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Details"
                    submittingLabel="Updating Details..."
                />
                {success && <SuccessDisplay success={success} />}
            </form>
        </div>
    )
}

export default StaticProfileForm
