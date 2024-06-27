'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

function UpdateBusinessForm({ businessDetails }) {
    const [states, setStates] = useState([])
    const [countries, setCountries] = useState([])
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
        description: '',
        short_description: '',
        tagline: '',
    })

    const handleChange = async e => {
        const { name, value } = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))

        if (name === 'country_id') {
            const countrySlug = countries.find(
                country => value === country.name,
            )
            if (countrySlug) {
                await fetchStates(countrySlug.slug)
            }
        }
    }
    const fetchStates = async countryName => {
        try {
            const response = await axios.get(
                `/api/address/countries/${countryName}/states/short-index`,
            )
            setStates(response.data.data)
        } catch (error) {
            console.error('Error fetching states:', error)
        }
    }
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(
                    '/api/address/countries/short-index',
                )
                setCountries(response.data.data)
            } catch (error) {
                console.error('Error fetching countries:', error)
            }
        }
        fetchCountries()
    }, [])

    useEffect(() => {
        if (businessDetails) {
            setFormData({
                name: businessDetails.name || '',
                company_size: businessDetails.company_size || '',
                company_type: businessDetails.company_type || '',
                mobile: businessDetails.mobile || '',
                email: businessDetails.email || '',
                date_of_incorporation:
                    businessDetails.date_of_incorporation || '',
                handle: businessDetails.handle || '',
                country_id: '',
                state_id: '',
                domain: '',
                description: businessDetails.description || '',
                short_description: businessDetails.short_description || '',
                tagline: businessDetails.tagline || '',
            })
        }
    }, [businessDetails])

    const handleUpdateBusiness = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        console.log(formData)
        const response = await axios.patch('/api/businesses', formData)
        // setIsSubmitting(false)
        // setFormData({
        //     name: '',
        //     company_size: '',
        //     company_type: '',
        //     mobile: '',
        //     email: '',
        //     date_of_incorporation: '',
        //     handle: '',
        //     country_id: '',
        //     state_id: '',
        //     domain: '',
        //     description: '',
        //     short_description: '',
        //     tagline: '',
        // })
        // router.push(`/businesses/${response.data.data.handle}`)
    }

    return (
        <>
            {businessDetails && (
                <div className="mx-5 py-2">
                    <div className="text-3xl font-bold py-5 underline decoration-primary ">
                        Update Your Business Details
                    </div>
                    <form
                        method="POST"
                        onSubmit={handleUpdateBusiness}
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
                            <label className="pt-0 label label-text font-semibold">
                                <span>Tagline</span>
                            </label>
                            <textarea
                                name="tagline"
                                value={formData.tagline}
                                onChange={handleChange}
                                placeholder="Tagline"
                                className="input input-primary w-full peer"
                                required
                            />
                        </div>
                        <div>
                            <label className="pt-0 label label-text font-semibold">
                                <span>Short Description</span>
                            </label>
                            <textarea
                                name="short_description"
                                value={formData.short_description}
                                onChange={handleChange}
                                placeholder="Short Description"
                                className="input input-primary w-full peer"
                                required
                            />
                        </div>
                        <div>
                            <label className="pt-0 label label-text font-semibold">
                                <span>Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="input input-primary w-full peer"
                                required
                            />
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
                        {/* <div>
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
                        </div> */}
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
                                                key={country.slug}
                                                value={country.name}>
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
                                            <option
                                                key={state.slug}
                                                value={state.name}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div>
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
                        </div> */}

                        <button
                            type="submit"
                            className="btn normal-case btn-primary"
                            disabled={isSubmitting}>
                            <span>
                                {isSubmitting
                                    ? 'Updating Your Business...'
                                    : 'Update Your Business'}
                            </span>
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default UpdateBusinessForm
