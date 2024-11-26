'use client'
import InputField from '@/components/ui/InputField'
import SelectField from '@/components/ui/SelectField'
import React, { useState } from 'react'

const AddAddressModal = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        line_1: '',
        line_2: '',
        country: '',
        state: '',
        is_default: false,
        is_public: false,
    })

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(formData)
        document.getElementById('add_address_modal').close()
    }

    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia']
    const states = ['California', 'New York', 'Texas', 'Florida']

    return (
        <dialog id="add_address_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Add New Address</h3>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <SelectField
                        label="Address Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        options={['Home', 'Work', 'Other']}
                        required
                    />

                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Address Name"
                        required
                    />

                    <InputField
                        label="Address Line 1"
                        type="text"
                        name="line_1"
                        value={formData.line_1}
                        onChange={handleChange}
                        placeholder="Street Address"
                        required
                    />

                    <InputField
                        label="Address Line 2"
                        type="text"
                        name="line_2"
                        value={formData.line_2}
                        onChange={handleChange}
                        placeholder="Apartment, suite, etc."
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <SelectField
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            options={countries}
                            required
                        />

                        <SelectField
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            options={states}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-2">
                                    Default Address
                                </span>
                                <input
                                    type="checkbox"
                                    name="is_default"
                                    checked={formData.is_default}
                                    onChange={handleChange}
                                    className="checkbox checkbox-primary"
                                />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-2">
                                    Public Address
                                </span>
                                <input
                                    type="checkbox"
                                    name="is_public"
                                    checked={formData.is_public}
                                    onChange={handleChange}
                                    className="checkbox checkbox-primary"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default AddAddressModal
