'use client'

import dynamic from 'next/dynamic'
import useFetchOptions from '@/hooks/useFetchOptions'
import FormSection from './FormSection'

const InputText = dynamic(
    () => import('@/components/dashboard/Input/InputText'),
    { ssr: false },
)
const SelectBox = dynamic(
    () => import('@/components/dashboard/Input/SelectBox'),
    { ssr: false },
)

const SalaryDetailsSection = ({ formData, updateFormValue }) => {
    const currencyOptions = useFetchOptions(
        '/enums/Main/Common-Currency',
        'currencyOptions',
        true,
    )

    return (
        <FormSection title="Salary and CTC">
            <SelectBox
                labelTitle="Currency"
                labelDescription="Select the currency for the salary."
                name="currency"
                options={currencyOptions}
                placeholder="Select currency"
                defaultValue={formData.currency}
                updateFormValue={updateFormValue}
                updateType="currency"
                required
            />

            <InputText
                labelTitle="Minimum CTC"
                labelDescription="Enter the minimum CTC (Cost to Company)."
                name="minimum_ctc"
                type="number"
                defaultValue={formData.minimum_ctc}
                updateFormValue={updateFormValue}
                updateType="minimum_ctc"
                required
            />
            <InputText
                labelTitle="Maximum CTC"
                labelDescription="Enter the maximum CTC (Cost to Company)."
                name="maximum_ctc"
                type="number"
                defaultValue={formData.maximum_ctc}
                updateFormValue={updateFormValue}
                updateType="maximum_ctc"
            />
        </FormSection>
    )
}

export default SalaryDetailsSection
