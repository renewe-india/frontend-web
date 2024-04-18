'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
const News = () => {
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
        console.log(formData)
        setIsSubmitting(false)
    }
    return (
        <>
            <div
                id="main-content"
                className="col-span-12 lg:col-span-8 xl:col-span-6">
                <div className="space-y-2">
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
                                    <div className="flex gap-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="input input-primary h-24 w-80 peer"
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
                                                type="text"
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
                                        {isSubmitting
                                            ? 'Publishing...'
                                            : 'Publish'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="card bg-base-200 rounded-lg p-5">
                        <div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <img
                                        src="https://picsum.photos/300/300"
                                        alt=""
                                        className="h-24 w-24 rounded"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Solar Industry Soars High: A New
                                            Dawn for Renewable Energy.
                                        </h2>
                                        <div>
                                            The solar industry is witnessing
                                            unprecedented growth, paving the way
                                            for a sustainable future.
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="badge">Solar Energy</div>
                                    <div className="badge">India</div>
                                </div>
                                <div>
                                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-1">
                                        <div className="text-xs text-gray-500">
                                            Satender Ahirwar and 1,441 others
                                        </div>
                                        <div className="text-xs text-gray-500 flex gap-4">
                                            <div>77 comments</div>
                                            <div>5 reposts</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4">
                                        <div className="dropdown">
                                            <div
                                                tabIndex={0}
                                                role="button"
                                                className="btn m-1">
                                                <button
                                                    type="button"
                                                    className="btn normal-case w-full btn-ghost">
                                                    <span className="block">
                                                        <svg
                                                            className="inline w-5 h-5"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="2"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-85">
                                                <div>
                                                    <div className="flex gap-3">
                                                        <button
                                                            type="button"
                                                            className="btn normal-case btn-square btn-ghost">
                                                            {/* SPINNER LEFT */}
                                                            {/* ICON */}
                                                            <span className="block">
                                                                <svg
                                                                    className="inline w-5 h-5"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="2"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round">
                                                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                                                                </svg>
                                                            </span>
                                                            {/* LABEL / SLOT */}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn normal-case btn-square btn-ghost">
                                                            <span className="block">
                                                                <svg
                                                                    className="inline w-5 h-5"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="2"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round">
                                                                    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                                                                </svg>
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn normal-case btn-square btn-ghost">
                                                            <span className="block">
                                                                <svg
                                                                    className="inline w-5 h-5"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="2"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round">
                                                                    <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z"></path>
                                                                    <path d="M10 10c-.5 -1 -2.5 -1 -3 0"></path>
                                                                    <path d="M17 10c-.5 -1 -2.5 -1 -3 0"></path>
                                                                    <path d="M14.5 15a3.5 3.5 0 0 1 -5 0"></path>
                                                                </svg>
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn normal-case btn-square btn-ghost">
                                                            <span className="block">
                                                                <svg
                                                                    className="inline w-5 h-5"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="2"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round">
                                                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                                                                    <path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25"></path>
                                                                    <path d="M12.5 15.5l2 2"></path>
                                                                    <path d="M15 13l2 2"></path>
                                                                </svg>
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn normal-case btn-square btn-ghost">
                                                            <span className="block">
                                                                <svg
                                                                    className="inline w-5 h-5"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="2"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round">
                                                                    <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z"></path>
                                                                    <path d="M10 10c-.5 -1 -2.5 -1 -3 0"></path>
                                                                    <path d="M17 10c-.5 -1 -2.5 -1 -3 0"></path>
                                                                    <path d="M14.5 15a3.5 3.5 0 0 1 -5 0"></path>
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn normal-case w-full btn-ghost">
                                            <span className="block">
                                                <svg
                                                    className="inline w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M8 9h8"></path>
                                                    <path d="M8 13h6"></path>
                                                    <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn normal-case w-full btn-ghost">
                                            <span className="block">
                                                <svg
                                                    className="inline w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"></path>
                                                    <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"></path>
                                                </svg>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn normal-case w-full btn-ghost">
                                            <span className="block">
                                                <svg
                                                    className="inline w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M10 14l11 -11"></path>
                                                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default News
