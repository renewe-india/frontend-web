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

const ApplyDetailsSection = ({ formData, updateFormValue }) => {
    const applyViaOptions = useFetchOptions(
        '/enums/JobBoard/ApplyVia',
        'applyViaOptions',
        true,
    )
    return (
        <FormSection title="Application Details">
            <SelectBox
                labelTitle="Apply Via"
                labelDescription="Select how candidates can apply."
                name="apply_via"
                options={applyViaOptions}
                placeholder="Select application method"
                defaultValue={formData.apply_via}
                updateFormValue={updateFormValue}
                updateType="apply_via"
                required
            />

            {formData.apply_via !== 'easy_apply' && (
                <InputText
                    labelTitle="Apply Via Data"
                    labelDescription="Provide the necessary information for application (e.g., website or email)."
                    name="apply_via_data"
                    containerStyle={'col-span-1 lg:col-span-2'}
                    defaultValue={formData.apply_via_data}
                    updateFormValue={updateFormValue}
                    updateType="apply_via_data"
                />
            )}
        </FormSection>
    )
}

export default ApplyDetailsSection
