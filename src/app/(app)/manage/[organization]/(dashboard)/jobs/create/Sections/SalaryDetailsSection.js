'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import axios from '@/lib/axios'
import FormSection from './FormSection'
const InputText = dynamic(() =>
    import('@/components/dashboard/Input/InputText'),
)
const SelectBox = dynamic(() =>
    import('@/components/dashboard/Input/SelectBox'),
)

const SalaryDetailsSection = ({ formData, updateFormValue }) => {
    const [currencyOptions, setCurrencyOptions] = useState([])

    useEffect(() => {
        const fetchCurrencies = async () => {
            const cachedCurrencies = localStorage.getItem('currencyOptions')
            const cachedTimestamp = localStorage.getItem('currencyTimestamp')
            const isCacheValid =
                cachedTimestamp &&
                Date.now() - cachedTimestamp < 24 * 60 * 60 * 1000

            if (cachedCurrencies && isCacheValid) {
                setCurrencyOptions(JSON.parse(cachedCurrencies))
            } else {
                const response = await axios.get('/enums/list')
                const currencies = Object.entries(response.data.data).map(
                    ([key, value]) => ({
                        value: key,
                        label: value,
                    }),
                )
                localStorage.setItem(
                    'currencyOptions',
                    JSON.stringify(currencies),
                )
                localStorage.setItem('currencyTimestamp', Date.now())
                setCurrencyOptions(currencies)
            }
        }

        fetchCurrencies()
    }, [])

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
