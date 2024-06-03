import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

function NewsForm() {
    const { createNews } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/news',
    })
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

    const handleSubmit = e => {
        e.preventDefault()
        setIsSubmitting(true)
        createNews({ setErrors, formData })
        setIsSubmitting(false)
        setFormData({
            headline: '',
            summary: '',
            body: '',
            published_at: '',
            image: null,
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <div className="card bg-base-200 rounded-lg p-5">
                        <div className="flex flex-col gap-2">
                            <div>
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
                                <textarea
                                    name="summary"
                                    value={formData.summary}
                                    onChange={handleChange}
                                    placeholder="Summary"
                                    className="input input-primary w-full peer"
                                    required
                                />
                            </div>
                            <div className="flex gap-6">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="input input-primary h-24 w-70 peer"
                                />
                                <div>
                                    <textarea
                                        name="body"
                                        value={formData.body}
                                        onChange={handleChange}
                                        placeholder="Body"
                                        className="input input-primary w-full peer"
                                        required
                                    />
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

                            <button
                                type="submit"
                                className="btn normal-case btn-primary"
                                disabled={isSubmitting}>
                                {isSubmitting ? 'Publishing...' : 'Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewsForm
