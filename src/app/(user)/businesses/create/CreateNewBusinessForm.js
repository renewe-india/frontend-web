'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'

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
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])

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
                    <div>
                        <label className="pt-0 label label-text font-semibold">
                            <span>Name</span>
                        </label>
                        <div className="flex">
                            <input
                                placeholder="Name"
                                className="input input-primary w-full peer rounded"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-5">
                            <div className="flex-1">
                                <label className="pt-0 label label-text font-semibold">
                                    <span>Company Type</span>
                                </label>
                                <select
                                    className="input input-primary w-full peer rounded"
                                    name="company_type"
                                    value={formData.company_type}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Select Type</option>
                                    <option value="Self Employed">
                                        Self Employed
                                    </option>
                                    <option value="Self Owned">
                                        Self Owned
                                    </option>
                                    <option value="Partnership">
                                        Partnership
                                    </option>
                                    <option value="Privately Held">
                                        Privately Held
                                    </option>
                                    <option value="Publicly Held">
                                        Publicly Held
                                    </option>
                                    <option value="Government Agency">
                                        Government Agency
                                    </option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="pt-0 label label-text font-semibold">
                                    <span>Handle</span>
                                </label>
                                <input
                                    placeholder="Handle"
                                    className="input input-primary w-full peer rounded"
                                    type="text"
                                    name="handle"
                                    value={formData.handle}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-5">
                            <div className="flex-1">
                                <label className="pt-0 label label-text font-semibold">
                                    <span>Email</span>
                                </label>
                                <input
                                    placeholder="example@xyz.com"
                                    className="input input-primary w-full peer rounded"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="pt-0 label label-text font-semibold">
                                    <span>Mobile No.</span>
                                </label>
                                <input
                                    placeholder="Mobile No."
                                    className="input input-primary w-full peer rounded"
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
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

                    <button
                        type="submit"
                        className="btn normal-case btn-primary"
                        disabled={isSubmitting}>
                        <span>
                            {isSubmitting
                                ? 'Creating a New Business...'
                                : 'Create a New Business'}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateNewBusinessForm
