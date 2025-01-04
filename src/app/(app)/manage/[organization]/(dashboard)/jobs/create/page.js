'use client'
import axios from '@/lib/axios'
import dynamic from 'next/dynamic'
import { useState, Suspense } from 'react'
import JobDetailsSection from './Sections/JobDetailsSection'
import ApplyDetailsSection from './Sections/ApplyDetailsSection'
import SalaryDetailsSection from './Sections/SalaryDetailsSection'
import FormSection from './Sections/FormSection'
import SkillComponent from './Sections/SkillComponent'
import { useRouter } from 'next/navigation'
import useEditor from '@/components/dashboard/Editor/useEditor'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { ConditionalRender } from '@/lib/utils'
import SubmitButton from '@/components/ui/SubmitButton'

const TitleCard = dynamic(() =>
    import('@/components/dashboard/Cards/TitleCard'),
)

function JobForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        location: '',
        apply_via: '',
        apply_via_data: '',
        number_of_openings: '1',
        currency: '',
        minimum_ctc: '',
        maximum_ctc: '',
        description: '',
        organization_name: '',
    })

    const [skills, setSkills] = useState([])
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const initialContent = `{
        "time": 1722345953820,
        "blocks": [
            {
                "id": "kDBeX0VLMj",
                "type": "header",
                "data": {
                    "text": "Hey! ",
                    "level": 2
                }
            },
            {
                "id": "kDBeX0VLMk",
                "type": "paragraph",
                "data": {
                    "text": "Write Your Body for Job here!"
                }
            }
        ],
        "version": "2.30.2"
    }`

    const { saveContent } = useEditor(initialContent)

    const updateFormValue = ({ updateType, value }) => {
        setFormData(prevData => ({
            ...prevData,
            [updateType]: value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors({})
        setLoading(true)

        try {
            const output = await saveContent()
            const formattedData = { ...formData }
            formattedData.description = JSON.stringify(output)

            if (
                skills.length > 0 &&
                formattedData.organization_name &&
                output.blocks.length > 0
            ) {
                const res = await axios.post('job-board/posts', formattedData)
                const jobResponse = res.data.data
                const payload = { skills }
                await axios.post(
                    `/job-board/posts/${jobResponse.slug}/skills/attach`,
                    payload,
                )
                router.push('/dashboard/job-board/posts')
                alert('Job added and skills attached successfully!')
            } else {
                alert('Add Description/Skills to create post.')
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors)
            } else {
                alert('Error adding job or attaching skills.')
            }
        } finally {
            setLoading(false) // Stop loading
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TitleCard title="Post a New Job" topMargin="mt-2">
                <div className="container mx-auto p-4">
                    <form onSubmit={handleSubmit}>
                        <JobDetailsSection
                            formData={formData}
                            updateFormValue={updateFormValue}
                        />
                        <ConditionalRender condition={errors.organization_name}>
                            <ErrorDisplay errors={errors.organization_name} />
                        </ConditionalRender>

                        <ConditionalRender condition={errors.location}>
                            <ErrorDisplay errors={errors.location} />
                        </ConditionalRender>
                        <ApplyDetailsSection
                            formData={formData}
                            updateFormValue={updateFormValue}
                        />

                        <ConditionalRender condition={errors.apply_via_data}>
                            <ErrorDisplay errors={errors.apply_via_data} />
                        </ConditionalRender>
                        <SalaryDetailsSection
                            formData={formData}
                            updateFormValue={updateFormValue}
                        />

                        <ConditionalRender condition={errors.maximum_ctc}>
                            <ErrorDisplay errors={errors.maximum_ctc} />
                        </ConditionalRender>
                        <ConditionalRender condition={errors.minimum_ctc}>
                            <ErrorDisplay errors={errors.minimum_ctc} />
                        </ConditionalRender>
                        <FormSection title="Job Description">
                            <div
                                id="editorjs"
                                className="container max-w-full h-full col-span-3"
                            />
                            <ConditionalRender condition={errors.description}>
                                <ErrorDisplay errors={errors.description} />
                            </ConditionalRender>
                        </FormSection>

                        <SkillComponent skills={skills} setSkills={setSkills} />

                        <div className="mt-16">
                            <SubmitButton
                                className="btn btn-primary float-right"
                                isSubmitting={loading}
                                label={'Post Job'}
                            />
                        </div>
                    </form>
                </div>
            </TitleCard>
        </Suspense>
    )
}

export default JobForm
