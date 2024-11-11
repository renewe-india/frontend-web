'use client'

// import { useState } from 'react'
import dynamic from 'next/dynamic'
import FormSection from './FormSection'

const InputText = dynamic(() =>
    import('@/components/dashboard/Input/InputText'),
)
const SelectBox = dynamic(() =>
    import('@/components/dashboard/Input/SelectBox'),
)

const JobDetailsSection = ({ formData, updateFormValue }) => {
    // const [jobTypeOptions, setJobTypeOptions] = useState([])
    let jobTypeOptions = []
    // useEffect(() => {
    //     const fetchJobTypes = async () => {
    //         const cachedJobTypes = localStorage.getItem('jobTypeOptions')
    //         const cachedTimestamp = localStorage.getItem('jobTypeTimestamp')
    //         const isCacheValid =
    //             cachedTimestamp &&
    //             Date.now() - cachedTimestamp < 24 * 60 * 60 * 1000

    //         if (cachedJobTypes && isCacheValid) {
    //             setJobTypeOptions(JSON.parse(cachedJobTypes))
    //         } else {
    //             const response = await axios.get('/enums/JobBoard/Type')
    //             const jobTypes = Object.entries(response.data.data).map(
    //                 ([key, value]) => ({
    //                     value: key,
    //                     label: value,
    //                 }),
    //             )

    //             localStorage.setItem('jobTypeOptions', JSON.stringify(jobTypes))
    //             localStorage.setItem('jobTypeTimestamp', Date.now())

    //             setJobTypeOptions(jobTypes)
    //         }
    //     }

    //     fetchJobTypes()
    // }, [])

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
