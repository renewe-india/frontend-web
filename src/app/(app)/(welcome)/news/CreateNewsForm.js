import axios from '@/lib/axios'
import { useState } from 'react'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import SubmitButton from '@/components/ui/SubmitButton'

function CreateNewsForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        headline: '',
        summary: '',
        body: '',
        published_at: '',
        image: null,
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleImageChange = e => {
        const file = e.target.files[0]
        setFormData({
            ...formData,
            image: file,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        const csrf = () => axios.get('/sanctum/csrf-cookie')
        try {
            await csrf()
            setErrors([])

            await axios.post('/news/articles', formData)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(['Validation error.'])
            } else {
                setErrors([
                    'An unexpected error occurred. Please try again later.',
                ])
            }
        } finally {
            setIsSubmitting(false)
            setFormData({
                headline: '',
                summary: '',
                body: '',
                published_at: '',
                image: null,
            })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <div className="card bg-base-200 rounded-lg p-5">
                        <div className="flex flex-col gap-2">
                            <div className="pb-5">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-2xl font-bold">
                                            Create a NEWS article
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="pt-0 label label-text font-semibold">
                                    <span>Headline</span>
                                </label>
                                <input
                                    type="text"
                                    name="headline"
                                    value={formData.headline}
                                    onChange={handleChange}
                                    placeholder="Headline"
                                    className="input input-primary w-full peer"
                                    required
                                />
                            </div>
                            <div>
                                <label className="pt-0 label label-text font-semibold">
                                    <span>Summary</span>
                                </label>
                                <textarea
                                    name="summary"
                                    value={formData.summary}
                                    onChange={handleChange}
                                    placeholder="Summary"
                                    className="input input-primary w-full peer"
                                    required
                                />
                            </div>
                            <div>
                                <label className="pt-0 label label-text font-semibold">
                                    <span>Body</span>
                                </label>
                                <textarea
                                    name="body"
                                    value={formData.body}
                                    onChange={handleChange}
                                    placeholder="Body"
                                    className="input input-primary w-full peer"
                                    required
                                />
                            </div>
                            <div className="flex gap-5">
                                <div className="flex-1">
                                    <label className="pt-0 label label-text font-semibold">
                                        <span>Image</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="input input-primary w-full peer"
                                    />
                                </div>
                                <div className="flex-1 gap">
                                    <label className="pt-0 label label-text font-semibold">
                                        <span>Published at</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="published_at"
                                        value={formData.published_at}
                                        onChange={handleChange}
                                        placeholder="Published At"
                                        className="input input-primary w-full peer"
                                        required
                                    />
                                </div>
                            </div>
                            <SubmitButton
                                isSubmitting={isSubmitting}
                                label="Publish"
                                submittingLabel="Publishing..."
                            />
                            <ErrorDisplay errors={errors} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateNewsForm
