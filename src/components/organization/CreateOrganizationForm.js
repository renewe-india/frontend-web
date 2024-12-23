'use client'
import React, { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/ui/SubmitButton'
import InputField from '@/components/ui/InputField'
import ErrorDisplay from '../ui/ErrorDisplay'
import MainCard from '../ui/MainCard'

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
            const response = await axios.post(`/organizations`, requestData)
            const org = response.data.data

            router.push(`/manage/${org.name}`)
        } catch (error) {
            setError(error.response.data.errors)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <MainCard
            title={`Create a New ${
                type.charAt(0).toUpperCase() + type.slice(1)
            }`}>
            <div>
                <form
                    method="POST"
                    onSubmit={handleCreateOrganization}
                    className="flex flex-col gap-3 form-control">
                    <div>
                        <InputField
                            label="Name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                        />
                    </div>
                    {error && <ErrorDisplay errors={error} />}
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        label={`Create a New ${
                            type.charAt(0).toUpperCase() + type.slice(1)
                        }`}
                    />
                </form>
            </div>
        </MainCard>
    )
}

export default CreateOrganizationForm
