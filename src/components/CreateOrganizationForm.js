'use client'
import React, { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/SubmitButton'
import InputField from '@/components/InputField'
import ErrorDisplay from './ErrorDisplay'

const CreateOrganizationForm = ({ type }) => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const handleCreateOrganization = async e => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        const display_name = data.name

        const requestData = {
            display_name,
            type: `${type}`,
        }

        try {
            const response = await axios.post(`/api/organizations`, requestData)
            const org = response.data.data

            router.push(
                `/${
                    type === 'business'
                        ? 'businesses'
                        : type === 'association'
                        ? 'associations'
                        : type
                }/${org.name}`,
            )
        } catch (error) {
            console.log(error)
            setError(error.response.data.errors)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5">
            <div className="pb-5">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-bold">
                            Create a New{' '}
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <form
                    method="POST"
                    onSubmit={handleCreateOrganization}
                    className="flex flex-col gap-3 form-control">
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                    />
                    {error && <ErrorDisplay errors={error.display_name} />}
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        label={`Create a New ${
                            type.charAt(0).toUpperCase() + type.slice(1)
                        }`}
                        submittingLabel={`Creating a New ${
                            type.charAt(0).toUpperCase() + type.slice(1)
                        }...`}
                    />
                </form>
            </div>
        </div>
    )
}

export default CreateOrganizationForm