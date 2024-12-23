'use client'
import InputField from '@/components/ui/InputField'
import SelectField from '@/components/ui/SelectField'
import useFetchOptions from '@/hooks/useFetchOptions'
import axios from '@/lib/axios'
import React, { useState, useEffect } from 'react'

const AddAddressModal = ({ address, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        line_1: '',
        line_2: '',
        country: '',
        state: '',
        postal_code: '',
        is_default: false,
        is_public: false,
        tax_name: null,
        tax_number: null,
    })

    const typeOptions = useFetchOptions('/enums/Address/AddressType', '', false)
    const countryOptions = useFetchOptions('/enums/Address/Country', '', false)
    const [stateOptions, setStateOptions] = useState([])

    useEffect(() => {
        if (address) {
            setFormData({ ...address })
        } else {
            setFormData({
                type: '',
                name: '',
                line_1: '',
                line_2: '',
                country: '',
                state: '',
                postal_code: '',
                is_default: false,
                is_public: false,
                tax_name: null,
                tax_number: null,
            })
        }
    }, [address])

    useEffect(() => {
        const fetchStates = async () => {
            if (!formData?.country) {
                setStateOptions([])
                return
            }

            const response = await axios.get(
                `/enums/Address/States-${formData.country.replace(/\s+/g, '')}`,
            )
            const states = Object.entries(response.data.data).map(
                ([key, value]) => ({
                    value: key,
                    label: value,
                }),
            )
            setStateOptions(states)
        }
        fetchStates()
    }, [formData?.country])

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
        onClose()
    }

    return (
        <dialog id="add_address_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={onClose}>
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">
                    {address ? 'Edit Address' : 'Add New Address'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div>
                        <SelectField
                            label="Address Type"
                            name="type"
                            value={formData?.type}
                            onChange={handleChange}
                            options={typeOptions}
                            placeholder="Select Address Type"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            {' '}
                            <InputField
                                label="Name"
                                type="text"
                                name="name"
                                value={formData?.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div>
                            {' '}
                            <InputField
                                label="Postal code"
                                type="text"
                                name="postal_code"
                                pattern="[0-9]{6}"
                                value={formData?.postal_code}
                                onChange={handleChange}
                                placeholder="Postal code"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <InputField
                            label="Address Line 1"
                            type="text"
                            name="line_1"
                            value={formData?.line_1}
                            onChange={handleChange}
                            placeholder="Street Address"
                            required
                        />
                    </div>
                    <div>
                        <InputField
                            label="Address Line 2"
                            type="text"
                            name="line_2"
                            value={formData?.line_2}
                            onChange={handleChange}
                            placeholder="Apartment, suite, etc."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <SelectField
                                label="Country"
                                name="country"
                                value={formData?.country}
                                onChange={handleChange}
                                options={countryOptions}
                                placeholder="Select Country"
                                required
                            />
                        </div>
                        <div>
                            <SelectField
                                label="State"
                                name="state"
                                value={formData?.state}
                                onChange={handleChange}
                                options={stateOptions}
                                placeholder="Select State"
                                required
                                disabled={!formData?.country}
                            />
                        </div>
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
                                    checked={formData?.is_default}
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
                                    checked={formData?.is_public}
                                    onChange={handleChange}
                                    className="checkbox checkbox-primary"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">
                            {address ? 'Save Changes' : 'Save Address'}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default AddAddressModal
