'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import TextAreaField from '@/components/TextAreaField'
import SubmitButton from '@/components/SubmitButton'

function UpdateBusinessForm({ businessDetails }) {
    const [states, setStates] = useState([])
    const [countries, setCountries] = useState([])
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        company_size: '',
        company_type: '',

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
            // console.error('Error fetching states:', error)
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
                //  console.error('Error fetching countries:', error)
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
                date_of_incorporation:
                    businessDetails.date_of_incorporation || '',
                handle: businessDetails.handle || '',
                country_id: businessDetails.country_id || '',
                state_id: businessDetails.state_id || '',
                description: businessDetails.description || '',
                short_description: businessDetails.short_description || '',
                tagline: businessDetails.tagline || '',
            })
        }
    }, [businessDetails])

    const handleUpdateBusiness = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        await axios.patch('/api/businesses/batch', formData)

        setIsSubmitting(false)
        setFormData({
            name: '',
            company_size: '',
            company_type: '',
            date_of_incorporation: '',
            handle: '',
            country_id: '',
            state_id: '',
            description: '',
            short_description: '',
            tagline: '',
        })
        router.push(`/businesses/${businessDetails.handle}`)
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
                        <InputField
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                        <TextAreaField
                            label="Tagline"
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleChange}
                            placeholder="Tagline"
                            required
                        />
                        <TextAreaField
                            label="Short Description"
                            name="short_description"
                            value={formData.short_description}
                            onChange={handleChange}
                            placeholder="Short Description"
                            required
                        />
                        <TextAreaField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            customClass="h-36"
                            required
                        />
                        <div className="flex flex-row gap-5">
                            <div className="flex-1">
                                {' '}
                                <SelectField
                                    label="Company Size"
                                    name="company_size"
                                    value={formData.company_size}
                                    onChange={handleChange}
                                    options={[
                                        '1 To 10 Employees',
                                        '11 To 100 Employees',
                                        '101 To 1000 Employees',
                                        'More Than 1000 Employees',
                                    ]}
                                    required
                                />
                            </div>
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
                        </div>
                        <div className="flex flex-row gap-5">
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
                            </div>{' '}
                            <div className="flex-1">
                                <InputField
                                    label="Date of Incorporation"
                                    type="date"
                                    name="date_of_incorporation"
                                    value={formData.date_of_incorporation}
                                    onChange={handleChange}
                                    placeholder="Date of Incorporation"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5">
                            <div className="flex-1">
                                <SelectField
                                    label="Country"
                                    name="country_id"
                                    value={formData.country_id}
                                    onChange={handleChange}
                                    options={countries.map(
                                        country => country.name,
                                    )}
                                    required
                                />
                            </div>{' '}
                            <div className="flex-1">
                                <SelectField
                                    label="State"
                                    name="state_id"
                                    value={formData.state_id}
                                    onChange={handleChange}
                                    options={states.map(state => state.name)}
                                    required
                                />
                            </div>
                        </div>
                        <SubmitButton
                            isSubmitting={isSubmitting}
                            label="Update Your Business"
                            submittingLabel="Updating Your Business..."
                        />
                    </form>
                </div>
            )}
        </>
    )
}

export default UpdateBusinessForm
