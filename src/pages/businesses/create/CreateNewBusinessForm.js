'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'

function CreateNewBusinessForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        company_size: '',
        company_type: '',
        mobile: '',
        email: '',
        date_of_incorporation: '',
        handle: '',
        country_id: '',
        state_id: '',
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

        if (name === 'country_id') {
            const selectedCountry = countries.find(
                country => country.id === parseInt(value),
            )
            if (selectedCountry) {
                await fetchStates(selectedCountry.slug)
            }
        }
    }

    const handleCreateNewBusiness = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        const response = await axios.post('/api/businesses', formData)
        setIsSubmitting(false)
        setFormData({
            name: '',
            company_size: '',
            company_type: '',
            mobile: '',
            email: '',
            date_of_incorporation: '',
            handle: '',
            country_id: '',
            state_id: '',
            domain: '',
        })
        router.push(`/businesses/${response.data.data.handle}`)
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('/api/address/countries')
                setCountries(response.data.data)
            } catch (error) {
                console.error('Error fetching countries:', error)
            }
        }
        fetchCountries()
    }, [])

    const fetchStates = async countryName => {
        try {
            const response = await axios.get(
                `/api/address/countries/${countryName}/states`,
            )
            setStates(response.data.data)
        } catch (error) {
            console.error('Error fetching states:', error)
        }
    }
    return (
        <div className="card bg-base-200 my-2 rounded-lg p-5">
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
                                    <span>Company Size</span>
                                </label>
                                <select
                                    className="input input-primary w-full peer rounded"
                                    name="company_size"
                                    value={formData.company_size}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Select Size</option>
                                    <option value="1 To 10 Employees">
                                        1 To 10 Employees
                                    </option>
                                    <option value="11 To 100 Employees">
                                        11 To 100 Employees
                                    </option>
                                    <option value="101 To 1000 Employees">
                                        101 To 1000 Employees
                                    </option>
                                    <option value="More Than 1000 Employees">
                                        More Than 1000 Employees
                                    </option>
                                </select>
                            </div>
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
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-5">
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
                                    <span>Date of Incorporation</span>
                                </label>
                                <input
                                    placeholder="Date of Incorporation"
                                    className="input input-primary w-full peer rounded"
                                    type="date"
                                    name="date_of_incorporation"
                                    value={formData.date_of_incorporation}
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
                                    <span>Country</span>
                                </label>
                                <select
                                    className="input input-primary w-full peer rounded"
                                    name="country_id"
                                    value={formData.country_id}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Select Country</option>
                                    {countries.map(country => (
                                        <option
                                            key={country.id}
                                            value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="pt-0 label label-text font-semibold">
                                    <span>State</span>
                                </label>
                                <select
                                    className="input input-primary w-full peer rounded"
                                    name="state_id"
                                    value={formData.state_id}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Select State</option>
                                    {states.map(state => (
                                        <option key={state.id} value={state.id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
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
