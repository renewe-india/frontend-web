'use client'

import React, { Suspense, lazy } from 'react'
import axios from '@/lib/axios'
import { useToast } from '@/context/ToastContext'
const TitleCard = lazy(() => import('@/components/dashboard/Cards/TitleCard'))
const InputText = lazy(() => import('@/components/dashboard/Input/InputText'))
const TextAreaInput = lazy(() =>
    import('@/components/dashboard/Input/TextAreaInput'),
)
const SelectBox = lazy(() => import('@/components/dashboard/Input/SelectBox'))

function JobForm() {
    const { notifySuccess, notifyError } = useToast()
    const [formData, setFormData] = React.useState({
        jobTitle: '',
        requiredExperienceMin: '',
        requiredExperienceMax: '',
        skills: '',
        recommendedSkills: '',
        jobType: '',
        partTimeFullTime: '',
        numberOfOpenings: '',
        jobDescription: '',
        responsibilities: '',
        additionalCandidatePreferences: '',
        ctc: '',
        perks: '',
        coverLetter: '',
        availability: '',
        assessmentQuestion1: '',
        assessmentQuestion2: '',
        alternateMobileNumber: '',
        numberOfEmployees: '',
    })

    // Handle form value updates
    const updateFormValue = ({ updateType, value }) => {
        setFormData(prevData => ({
            ...prevData,
            [updateType]: value,
        }))
    }

    // Handle form submission
    const handleSubmit = async e => {
        e.preventDefault()

        const formattedData = {
            ...formData,
            skills: formData.skills.split(','),
            recommendedSkills: formData.recommendedSkills.split(','),
            responsibilities: formData.responsibilities.split(','),
            perks: formData.perks.split(','),
        }

        try {
            await axios.post('/api/jobs', formattedData)
            notifySuccess('Job added successfully!')
        } catch (error) {
            notifyError('Error adding job.')
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TitleCard title="Post a New Job" topMargin="mt-2">
                <div className="container mx-auto p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <InputText
                                labelTitle="Job Title"
                                labelDescription="Enter the title of the job."
                                name="jobTitle"
                                defaultValue={formData.jobTitle}
                                updateFormValue={updateFormValue}
                                updateType="jobTitle"
                                required
                            />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Required Experience
                                    </span>
                                </label>
                                <div className="flex gap-2 items-center">
                                    <InputText
                                        name="requiredExperienceMin"
                                        inputType="number"
                                        defaultValue={
                                            formData.requiredExperienceMin
                                        }
                                        updateFormValue={updateFormValue}
                                        updateType="requiredExperienceMin"
                                        required
                                    />
                                    <span>to</span>
                                    <InputText
                                        name="requiredExperienceMax"
                                        inputType="number"
                                        defaultValue={
                                            formData.requiredExperienceMax
                                        }
                                        updateFormValue={updateFormValue}
                                        updateType="requiredExperienceMax"
                                        required
                                    />
                                    <span>year(s)</span>
                                </div>
                            </div>
                            <InputText
                                labelTitle="Skills Required"
                                labelDescription="Enter the skills required for the job, separated by commas."
                                name="skills"
                                defaultValue={formData.skills}
                                updateFormValue={updateFormValue}
                                updateType="skills"
                                required
                            />
                            <InputText
                                labelTitle="Recommended Skills"
                                labelDescription="Enter the recommended skills for the job, separated by commas."
                                name="recommendedSkills"
                                defaultValue={formData.recommendedSkills}
                                updateFormValue={updateFormValue}
                                updateType="recommendedSkills"
                                required
                            />
                            <SelectBox
                                labelTitle="Job Type"
                                labelDescription="Select the type of job."
                                name="jobType"
                                options={[
                                    { value: 'In Office', label: 'In Office' },
                                    { value: 'Hybrid', label: 'Hybrid' },
                                    { value: 'Remote', label: 'Remote' },
                                ]}
                                placeholder="Select job type"
                                defaultValue={formData.jobType}
                                updateFormValue={updateFormValue}
                                updateType="jobType"
                                required
                            />
                            <SelectBox
                                labelTitle="Part-time/Full-time"
                                labelDescription="Select whether the job is part-time or full-time."
                                name="partTimeFullTime"
                                options={[
                                    { value: 'Part-time', label: 'Part-time' },
                                    { value: 'Full-time', label: 'Full-time' },
                                ]}
                                placeholder="Select part-time/full-time"
                                defaultValue={formData.partTimeFullTime}
                                updateFormValue={updateFormValue}
                                updateType="partTimeFullTime"
                                required
                            />
                            <InputText
                                labelTitle="Number of Openings"
                                labelDescription="Enter the number of openings for the job."
                                name="numberOfOpenings"
                                inputType="number"
                                defaultValue={formData.numberOfOpenings}
                                updateFormValue={updateFormValue}
                                updateType="numberOfOpenings"
                                required
                            />
                            <TextAreaInput
                                labelTitle="Job Description"
                                labelDescription="Enter a detailed description of the job."
                                name="jobDescription"
                                defaultValue={formData.jobDescription}
                                updateFormValue={updateFormValue}
                                updateType="jobDescription"
                                required
                            />
                            <InputText
                                labelTitle="Responsibilities"
                                labelDescription="Enter the responsibilities of the job, separated by commas."
                                name="responsibilities"
                                defaultValue={formData.responsibilities}
                                updateFormValue={updateFormValue}
                                updateType="responsibilities"
                                required
                            />
                            <TextAreaInput
                                labelTitle="Additional Candidate Preferences"
                                labelDescription="Enter any additional preferences for the candidate."
                                name="additionalCandidatePreferences"
                                defaultValue={
                                    formData.additionalCandidatePreferences
                                }
                                updateFormValue={updateFormValue}
                                updateType="additionalCandidatePreferences"
                                required
                            />
                            <InputText
                                labelTitle="CTC"
                                labelDescription="Enter the CTC for the job."
                                name="ctc"
                                defaultValue={formData.ctc}
                                updateFormValue={updateFormValue}
                                updateType="ctc"
                                required
                            />
                            <InputText
                                labelTitle="Perks"
                                labelDescription="Enter the perks of the job, separated by commas."
                                name="perks"
                                defaultValue={formData.perks}
                                updateFormValue={updateFormValue}
                                updateType="perks"
                                required
                            />
                            <TextAreaInput
                                labelTitle="Cover Letter"
                                labelDescription="Enter the cover letter for the job."
                                name="coverLetter"
                                defaultValue={formData.coverLetter}
                                updateFormValue={updateFormValue}
                                updateType="coverLetter"
                                required
                            />
                            <TextAreaInput
                                labelTitle="Availability"
                                labelDescription="Enter the availability for the job."
                                name="availability"
                                defaultValue={formData.availability}
                                updateFormValue={updateFormValue}
                                updateType="availability"
                                required
                            />
                            <TextAreaInput
                                labelTitle="Assessment Question 1"
                                labelDescription="Enter the first assessment question for the job."
                                name="assessmentQuestion1"
                                defaultValue={formData.assessmentQuestion1}
                                updateFormValue={updateFormValue}
                                updateType="assessmentQuestion1"
                                required
                            />
                            <TextAreaInput
                                labelTitle="Assessment Question 2"
                                labelDescription="Enter the second assessment question for the job."
                                name="assessmentQuestion2"
                                defaultValue={formData.assessmentQuestion2}
                                updateFormValue={updateFormValue}
                                updateType="assessmentQuestion2"
                                required
                            />
                            <InputText
                                labelTitle="Alternate Mobile Number"
                                labelDescription="Enter the alternate mobile number for the job."
                                name="alternateMobileNumber"
                                defaultValue={formData.alternateMobileNumber}
                                updateFormValue={updateFormValue}
                                updateType="alternateMobileNumber"
                                required
                            />
                            <SelectBox
                                labelTitle="Number of Employees"
                                labelDescription="Select the number of employees in your organization."
                                name="numberOfEmployees"
                                options={[
                                    { value: '1-10', label: '1-10' },
                                    { value: '11-50', label: '11-50' },
                                    { value: '51-100', label: '51-100' },
                                    // Add more options as needed
                                ]}
                                placeholder="Select number of employees"
                                defaultValue={formData.numberOfEmployees}
                                updateFormValue={updateFormValue}
                                updateType="numberOfEmployees"
                                required
                            />
                        </div>
                        <div className="mt-16">
                            <button
                                className="btn btn-primary float-right"
                                type="submit">
                                Post Job
                            </button>
                        </div>
                    </form>
                </div>
            </TitleCard>
        </Suspense>
    )
}

export default JobForm
