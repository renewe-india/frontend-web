'use client'
import React, { useEffect, useState } from 'react'
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import axios from '@/lib/axios'
import SuccessDisplay from '@/components/ui/SuccessDisplay'
import { useUser } from '@/context/UserContext'
import {
    GenderFemale,
    GenderMale,
    GenderNonbinary,
} from '@phosphor-icons/react'

const StaticProfileForm = () => {
    const { user, isLoading } = useUser()
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

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
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 form-control">
                <div>
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <ErrorDisplay
                    errors={error?.name}
                    onClose={() => setError(null)}
                />
                <div>
                    <label className="pt-0 label label-text font-semibold">
                        <span>Gender</span>
                    </label>
                    <div className="grid grid-cols-3 gap-5">
                        <button
                            type="button"
                            onClick={() => setGender('male')}
                            className={`btn normal-case btn-outline ${
                                gender === 'male' && 'btn-primary'
                            }`}>
                            <GenderMale size="24" weight="duotone" />
                            Male
                        </button>
                        <button
                            type="button"
                            onClick={() => setGender('female')}
                            className={`btn normal-case btn-outline lg:p-0 ${
                                gender === 'female' && 'btn-primary'
                            }`}>
                            <GenderFemale size="24" weight="duotone" />
                            Female
                        </button>
                        <button
                            type="button"
                            onClick={() => setGender('other')}
                            className={`btn normal-case btn-outline ${
                                gender === 'other' && 'btn-primary'
                            }`}>
                            <GenderNonbinary size="24" weight="duotone" />
                            Other
                        </button>
                        <input type="hidden" name="gender" value={gender} />
                    </div>
                </div>
                <ErrorDisplay
                    errors={error?.gender}
                    onClose={() => setError(null)}
                />
                <div>
                    <InputField
                        label="Date of Birth"
                        type="date"
                        name="date_of_birth"
                        placeholder="Date of Birth"
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>

                <ErrorDisplay
                    errors={error?.date_of_birth}
                    onClose={() => setError(null)}
                />

                <ErrorDisplay errors={error} onClose={() => setError(null)} />

                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Details"
                />
                <SuccessDisplay success={success} />
            </form>
        </>
    )
}

export default StaticProfileForm
