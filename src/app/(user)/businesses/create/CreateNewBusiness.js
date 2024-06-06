import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import ErrorDisplay from '@/components/ErrorDisplay'

function CreateNewBusiness() {
    const { CreateNewBusiness } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        // tagline: '',
        // description: '',
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

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    }
    const handleCreateNewBusiness = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        await CreateNewBusiness({
            formData,
            setErrors,
        })
        console.log(formData)
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
        // })
    }
    useEffect(() => {
        if (errors.length > 0) {
            setIsSubmitting(false)
        }
    }, [errors])
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
                            />
                        </div>
                    </div>
                    {/* <div>
                        <label className="pt-0 label label-text font-semibold">
                            <span>Tagline</span>
                        </label>
                        <div className="flex">
                            <input
                                placeholder="Tagline"
                                className="input input-primary w-full peer rounded"
                                type="text"
                                name="tagline"
                                value={formData.tagline}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="pt-0 label label-text font-semibold">
                            <span>Description</span>
                        </label>
                        <div className="flex">
                            <input
                                placeholder="Description"
                                className="input input-primary w-full peer rounded"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div> */}
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
                                    onChange={handleChange}>
                                    <option value="">
                                        Select Company Size
                                    </option>
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
                                    onChange={handleChange}>
                                    <option value="">
                                        Select Company Type
                                    </option>
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
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-5">
                            <div className="flex-1">
                                <label className="pt-0 label label-text font-semibold">
                                    <span>Country ID</span>
                                </label>
                                <input
                                    placeholder="Country ID"
                                    className="input input-primary w-full peer rounded"
                                    type="text"
                                    name="country_id"
                                    value={formData.country_id}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="pt-0 label label-text font-semibold">
                                    <span>State ID</span>
                                </label>
                                <input
                                    placeholder="State ID"
                                    className="input input-primary w-full peer rounded"
                                    type="text"
                                    name="state_id"
                                    value={formData.state_id}
                                    onChange={handleChange}
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
                    <ErrorDisplay errors={errors} />
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

export default CreateNewBusiness
