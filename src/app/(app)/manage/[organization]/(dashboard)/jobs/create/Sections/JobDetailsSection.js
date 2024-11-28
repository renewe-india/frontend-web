'use client'

import dynamic from 'next/dynamic'
import FormSection from './FormSection'
import useFetchOptions from '@/hooks/useFetchOptions'

const InputText = dynamic(
    () => import('@/components/dashboard/Input/InputText'),
    { ssr: false },
)
const SelectBox = dynamic(
    () => import('@/components/dashboard/Input/SelectBox'),
    { ssr: false },
)

const JobDetailsSection = ({ formData, updateFormValue }) => {
    const jobTypeOptions = useFetchOptions(
        '/enums/JobBoard/Type',
        'jobTypeOptions',
        true,
    )

    return (
        <FormSection title="Job Details">
            <InputText
                labelTitle="Job Title"
                containerStyle={'col-span-1 lg:col-span-3'}
                labelDescription="Enter the title of the job."
                name="title"
                defaultValue={formData.title}
                updateFormValue={updateFormValue}
                updateType="title"
                required
            />

            <SelectBox
                labelTitle="Job Type"
                labelDescription="Select the type of job."
                name="type"
                options={jobTypeOptions}
                placeholder="Select job type"
                defaultValue={formData.type}
                updateFormValue={updateFormValue}
                updateType="type"
                required
            />

            <InputText
                labelTitle="Location"
                labelDescription="Enter the job location."
                name="location"
                defaultValue={formData.location}
                updateFormValue={updateFormValue}
                updateType="location"
                required
            />
            <InputText
                labelTitle="Number of Openings"
                labelDescription="Enter the number of openings for the job."
                name="number_of_openings"
                inputType="number"
                defaultValue={formData.number_of_openings}
                updateFormValue={updateFormValue}
                updateType="number_of_openings"
                required
                isCounter={true}
            />
        </FormSection>
    )
}

export default JobDetailsSection
