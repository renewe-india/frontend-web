'use client'

import React, { useState, Suspense, lazy } from 'react'
import { useToast } from '@/context/ToastContext'
const TitleCard = lazy(() => import('@/components/dashboard/Cards/TitleCard'))
const InputText = lazy(() => import('@/components/dashboard/Input/InputText'))
const TextAreaInput = lazy(() =>
    import('@/components/dashboard/Input/TextAreaInput'),
)
const SelectBox = lazy(() => import('@/components/dashboard/Input/SelectBox'))
const DatePickerInput = lazy(() =>
    import('@/components/dashboard/Input/DatePickerInput'),
)

function StockForm({ categoryOptions, warehouseOptions }) {
    const { notifySuccess, notifyError } = useToast()
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        warehouseLocation: '',
        batchNumber: '',
        expiryDate: '',
        supplierName: '',
        specifications: '',
    })

    const HandleFormChange = ({ updateType, value }) => {
        setFormData(prevData => ({
            ...prevData,
            [updateType]: value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            // await axios.post('/solar-stocks', formData)
            notifySuccess('Stock added successfully!')
        } catch (error) {
            notifyError('Error adding stock.')
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TitleCard title="Add New Solar Stock" topMargin="mt-2">
                <div className="container mx-auto p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <InputText
                            labelTitle="Product Name"
                            labelDescription="Enter the name of the solar product."
                            name="productName"
                            defaultValue={formData.productName}
                            updateFormValue={HandleFormChange}
                            updateType="productName"
                            required
                        />
                        <SelectBox
                            labelTitle="Category"
                            labelDescription="Select the category of the solar product."
                            name="category"
                            options={categoryOptions}
                            placeholder="Select category"
                            defaultValue={formData.category}
                            updateFormValue={HandleFormChange}
                            updateType="category"
                            required
                        />
                        <InputText
                            labelTitle="Price"
                            labelDescription="Enter the price of the solar product."
                            name="price"
                            inputType="number"
                            defaultValue={formData.price}
                            updateFormValue={HandleFormChange}
                            updateType="price"
                            required
                        />
                        <InputText
                            labelTitle="Quantity"
                            labelDescription="Enter the available quantity of the solar product."
                            name="quantity"
                            inputType="number"
                            defaultValue={formData.quantity}
                            updateFormValue={HandleFormChange}
                            updateType="quantity"
                            required
                        />
                        <SelectBox
                            labelTitle="Warehouse Location"
                            labelDescription="Select the warehouse where the product is stored."
                            name="warehouseLocation"
                            options={warehouseOptions}
                            placeholder="Select warehouse location"
                            defaultValue={formData.warehouseLocation}
                            updateFormValue={HandleFormChange}
                            updateType="warehouseLocation"
                            required
                        />
                        <InputText
                            labelTitle="Batch Number"
                            labelDescription="Enter the batch number for tracking."
                            name="batchNumber"
                            defaultValue={formData.batchNumber}
                            updateFormValue={HandleFormChange}
                            updateType="batchNumber"
                            required
                        />
                        <DatePickerInput
                            labelTitle="Expiry Date"
                            labelDescription="Select the expiry date for the product (if applicable)."
                            name="expiryDate"
                            defaultValue={formData.expiryDate}
                            updateFormValue={HandleFormChange}
                            updateType="expiryDate"
                            required
                        />
                        <InputText
                            labelTitle="Supplier Name"
                            labelDescription="Enter the name of the supplier."
                            name="supplierName"
                            defaultValue={formData.supplierName}
                            updateFormValue={HandleFormChange}
                            updateType="supplierName"
                            required
                        />

                        <TextAreaInput
                            labelTitle="Specifications"
                            labelDescription="Enter the specifications of the solar product."
                            name="specifications"
                            defaultValue={formData.specifications}
                            updateFormValue={HandleFormChange}
                            updateType="specifications"
                            required
                        />
                        <TextAreaInput
                            labelTitle="Description"
                            labelDescription="Provide a detailed description of the solar product."
                            name="description"
                            defaultValue={formData.description}
                            updateFormValue={HandleFormChange}
                            updateType="description"
                            required
                        />
                        <div className="mt-16">
                            <button
                                className="btn btn-primary float-right"
                                type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </TitleCard>
        </Suspense>
    )
}

export default StockForm
