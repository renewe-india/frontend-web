'use client'
import React, { useState } from 'react'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import InputText from '@/components/dashboard/Input/InputText'
import TextAreaInput from '@/components/dashboard/Input/TextAreaInput'
import SelectBox from '@/components/dashboard/Input/SelectBox'
import { useOrganization } from '@/context/OrganizationContext'
import DatePickerInput from '@/components/dashboard/Input/DatePickerInput'
import axios from '@/lib/axios'

function ProfileSettings({
    companySizeOptions,
    companyTypeOptions,
    notifySuccess,
    notifyError,
}) {
    const organization = useOrganization()

    const [formData, setFormData] = useState({
        display_name: organization?.display_name || '',
        company_size: organization?.company_size || '',
        company_type: organization?.company_type || '',
        date_of_incorporation: organization?.date_of_incorporation || '',
        description: organization?.description || '',
        tagline: organization?.tagline || '',
        short_description: organization?.short_description || '',
    })

    const updateFormValue = ({ updateType, value }) => {
        setFormData(prevData => ({
            ...prevData,
            [updateType]: value,
        }))
    }

    const updateProfile = async () => {
        try {
            await axios.patch(
                `/api/organizations/${organization?.name}`,
                formData,
            )
            notifySuccess('Profile updated successfully!')
        } catch (error) {
            notifyError('Error updating profile.')
        }
    }

    return (
        <>
            <TitleCard title="Profile Settings" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText
                        labelTitle="Name"
                        labelDescription="Enter the full name of your organization."
                        defaultValue={formData.display_name}
                        updateFormValue={updateFormValue}
                        updateType="display_name"
                    />
                    <SelectBox
                        labelTitle="Company Size"
                        labelDescription="Select the number of employees in your company."
                        defaultValue={formData.company_size}
                        options={companySizeOptions}
                        placeholder="Select company size"
                        updateFormValue={updateFormValue}
                        updateType="company_size"
                    />
                    <SelectBox
                        labelTitle="Company Type"
                        labelDescription="Select the type of your company from the list."
                        defaultValue={formData.company_type}
                        options={companyTypeOptions}
                        placeholder="Select company type"
                        updateFormValue={updateFormValue}
                        updateType="company_type"
                    />
                    <DatePickerInput
                        labelTitle="Date of Incorporation"
                        labelDescription="Select the date your company was incorporated."
                        defaultValue={formData.date_of_incorporation}
                        updateFormValue={updateFormValue}
                        updateType="date_of_incorporation"
                    />
                    <TextAreaInput
                        labelTitle="Description"
                        labelDescription="Provide a brief description of your company."
                        defaultValue={formData.description}
                        updateFormValue={updateFormValue}
                        updateType={'description'}
                    />
                    <TextAreaInput
                        labelTitle="Tagline"
                        labelDescription="Enter a short tagline or slogan for your company."
                        defaultValue={formData.tagline}
                        updateFormValue={updateFormValue}
                        updateType={'tagline'}
                    />
                    <TextAreaInput
                        labelTitle="Short Description"
                        labelDescription="Write a concise summary of your company."
                        defaultValue={formData.short_description}
                        updateFormValue={updateFormValue}
                        updateType={'short_description'}
                    />
                </div>

                <div className="mt-16">
                    <button
                        className="btn btn-primary float-right"
                        onClick={updateProfile}>
                        Update
                    </button>
                </div>
            </TitleCard>
        </>
    )
}

export default ProfileSettings
