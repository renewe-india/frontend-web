'use client'
import React, { useState } from 'react'
// import axios from '@/lib/axios'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import dynamic from 'next/dynamic'
import { useToast } from '@/context/ToastContext'

// Dynamically import components
const InputText = dynamic(
    () => import('@/components/dashboard/Input/InputText'),
    { ssr: false },
)
const TextAreaInput = dynamic(
    () => import('@/components/dashboard/Input/TextAreaInput'),
    { ssr: false },
)
const SelectBox = dynamic(
    () => import('@/components/dashboard/Input/SelectBox'),
    { ssr: false },
)
const DatePickerInput = dynamic(
    () => import('@/components/dashboard/Input/DatePickerInput'),
    { ssr: false },
)

function UpdateStock({ stock, stockData, categoryOptions, warehouseOptions }) {
    const { notifySuccess, notifyError } = useToast()
    const [formData, setFormData] = useState({
        productName: stockData.productName || '',
        description: stockData.description || '',
        price: stockData.price || '',
        quantity: stockData.quantity || '',
        category: stockData.category || '',
        warehouseLocation: stockData.warehouseLocation || '',
        batchNumber: stockData.batchNumber || '',
        expiryDate: stockData.expiryDate || '',
        supplierName: stockData.supplierName || '',
        specifications: stockData.specifications || '',
    })

    const updateFormValue = ({ updateType, value }) => {
        setFormData(prevData => ({
            ...prevData,
            [updateType]: value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            // await axios.put(`/solar-stocks/${stock}`, formData)
            notifySuccess(`Stock ${stock} updated successfully!`)
        } catch (error) {
            notifyError('Error updating stock.')
        }
    }

    return (
        <TitleCard title="Update Product" topMargin="mt-2">
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <InputText
                            labelTitle="Product Name"
                            labelDescription="Enter the name of the solar product."
                            name="productName"
                            defaultValue={formData.productName}
                            updateFormValue={updateFormValue}
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
                            updateFormValue={updateFormValue}
                            updateType="category"
                            required
                        />
                        <InputText
                            labelTitle="Price"
                            labelDescription="Enter the price of the solar product."
                            name="price"
                            inputType="number"
                            defaultValue={formData.price}
                            updateFormValue={updateFormValue}
                            updateType="price"
                            required
                        />
                        <InputText
                            labelTitle="Quantity"
                            labelDescription="Enter the available quantity of the solar product."
                            name="quantity"
                            inputType="number"
                            defaultValue={formData.quantity}
                            updateFormValue={updateFormValue}
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
                            updateFormValue={updateFormValue}
                            updateType="warehouseLocation"
                            required
                        />
                        <InputText
                            labelTitle="Batch Number"
                            labelDescription="Enter the batch number for tracking."
                            name="batchNumber"
                            defaultValue={formData.batchNumber}
                            updateFormValue={updateFormValue}
                            updateType="batchNumber"
                            required
                        />
                        <DatePickerInput
                            labelTitle="Expiry Date"
                            labelDescription="Select the expiry date for the product (if applicable)."
                            name="expiryDate"
                            defaultValue={formData.expiryDate}
                            updateFormValue={updateFormValue}
                            updateType="expiryDate"
                            required
                        />
                        <InputText
                            labelTitle="Supplier Name"
                            labelDescription="Enter the name of the supplier."
                            name="supplierName"
                            defaultValue={formData.supplierName}
                            updateFormValue={updateFormValue}
                            updateType="supplierName"
                            required
                        />

                        <TextAreaInput
                            labelTitle="Specifications"
                            labelDescription="Enter the specifications of the solar product."
                            name="specifications"
                            defaultValue={formData.specifications}
                            updateFormValue={updateFormValue}
                            updateType="specifications"
                            required
                        />
                        <TextAreaInput
                            labelTitle="Description"
                            labelDescription="Provide a detailed description of the solar product."
                            name="description"
                            defaultValue={formData.description}
                            updateFormValue={updateFormValue}
                            updateType="description"
                            required
                        />
                    </div>
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
    )
}

export default UpdateStock
