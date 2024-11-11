'use client'

// import { useState } from 'react'
import dynamic from 'next/dynamic'
import FormSection from './FormSection'
const InputText = dynamic(
    () => import('@/components/dashboard/Input/InputText'),
    { ssr: false },
)
const SelectBox = dynamic(
    () => import('@/components/dashboard/Input/SelectBox'),
    { ssr: false },
)

const ApplyDetailsSection = ({ formData, updateFormValue }) => {
    // const [applyViaOptions, setApplyViaOptions] = useState([])
    let applyViaOptions = []
    // useEffect(() => {
    //     const fetchApplyViaOptions = async () => {
    //         const cachedApplyViaOptions = localStorage.getItem(
    //             'applyViaOptions',
    //         )
    //         const cachedTimestamp = localStorage.getItem('applyViaTimestamp')
    //         const isCacheValid =
    //             cachedTimestamp &&
    //             Date.now() - cachedTimestamp < 24 * 60 * 60 * 1000

    //         if (cachedApplyViaOptions && isCacheValid) {
    //             setApplyViaOptions(JSON.parse(cachedApplyViaOptions))
    //         } else {
    //             const response = await axios.get('/enums/JobBoard/ApplyVia')
    //             const applyViaData = Object.entries(response.data.data).map(
    //                 ([key, value]) => ({
    //                     value: key,
    //                     label: value,
    //                 }),
    //             )
    //             localStorage.setItem(
    //                 'applyViaOptions',
    //                 JSON.stringify(applyViaData),
    //             )
    //             localStorage.setItem('applyViaTimestamp', Date.now())
    //         }
    //     }

    //     fetchApplyViaOptions()
    // }, [])

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
