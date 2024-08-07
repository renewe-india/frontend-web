'use client'
import React, { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/SubmitButton'
import InputField from '@/components/InputField'

function CreateNewBusinessForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCreateNewBusiness = async e => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        const display_name = data.name

        const requestData = {
            display_name,
            type: 'business',
        }

        try {
            const response = await axios.post('/api/organizations', requestData)
            console.log(response)
            // router.push(`/businesses/${response.data.data.display_name}`)
        } catch (error) {
            console.error('Error creating business:', error)
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
                            Create a New Business
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <form
                    method="POST"
                    onSubmit={handleCreateNewBusiness}
                    className="flex flex-col gap-5 form-control">
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                    />
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        label="Create a New Business"
                        submittingLabel="Creating a New Business..."
                    />
                </form>
            </div>
        </div>
    )
}

export default CreateNewBusinessForm
