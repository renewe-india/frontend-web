'use client'
import React, { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/SubmitButton'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'

function CreateNewBusinessForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        company_type: '',
        mobile: '',
        email: '',
        handle: '',
        domain: '',
    })

    const handleChange = async e => {
        const { name, value } = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleCreateNewBusiness = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        const response = await axios.post('/api/businesses', formData)
        setIsSubmitting(false)
        setFormData({
            name: '',
            company_type: '',
            mobile: '',
            email: '',
            handle: '',
            domain: '',
        })
        router.push(`/businesses/${response.data.data.handle}`)
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
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <div>
                        <div className="flex flex-row gap-5">
                            <div className="flex-1">
                                <SelectField
                                    label="Company Type"
                                    name="company_type"
                                    value={formData.company_type}
                                    onChange={handleChange}
                                    options={[
                                        'Self Employed',
                                        'Self Owned',
                                        'Partnership',
                                        'Privately Held',
                                        'Publicly Held',
                                        'Government Agency',
                                    ]}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <InputField
                                    label="Handle"
                                    type="text"
                                    name="handle"
                                    value={formData.handle}
                                    onChange={handleChange}
                                    placeholder="Handle"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-5">
                            <div className="flex-1">
                                <InputField
                                    label="Email"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@xyz.com"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <InputField
                                    label="Mobile No."
                                    type="number"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Mobile No."
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="pt-0 label label-text font-semibold">
                            <span>Domain</span>
                        </label>
                        <div className="flex">
                            <div className="rounded-l-lg flex items-center bg-base-200 border border-primary border-r-0 px-4">
                                https://www.
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    placeholder="example.com"
                                    className="input input-primary w-full peer rounded-l-none"
                                    type="text"
                                    name="domain"
                                    value={formData.domain}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

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
