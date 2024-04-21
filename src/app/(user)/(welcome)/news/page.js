'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import {
    ArrowClockwise,
    ArrowsClockwise,
    ChatCenteredText,
    Confetti,
    Handshake,
    Heart,
    PaperPlaneTilt,
    Smiley,
    ThumbsUp,
} from '@phosphor-icons/react'
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
                                        <div className="dropdown normal-case w-full btn-ghost">
                                            <div tabIndex={0} role="button">
                                                <button
                                                    type="button"
                                                    className="btn normal-case w-full ">
                                                    <span className="block">
                                                        <ThumbsUp
                                                            size={24}
                                                            stroke={2}
                                                        />
                                                    </span>
                                                </button>
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="btn  dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-85">
                                                <div>
                                                    <div className="flex gap-3">
                                                        <button
                                                            type="button"
                                                            className="normal-case btn-square btn-ghost">
                                                            {/* SPINNER LEFT */}
                                                            {/* ICON */}
                                                            <span className="block">
                                                                <Heart
                                                                    size={24}
                                                                    stroke={2}
                                                                />
                                                            </span>
                                                            {/* LABEL / SLOT */}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn normal-case btn-square btn-ghost">
                                                            <span className="block">
                                                                <ThumbsUp
                                                                    size={24}
                                                                    stroke={2}
                                                                />
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn normal-case btn-square btn-ghost">
                                                            <span className="block">
                                                                <Smiley
                                                                    size={24}
                                                                    stroke={2}
                                                                />
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn normal-case btn-square btn-ghost">
                                                            <span className="block">
                                                                <Handshake
                                                                    size={24}
                                                                    stroke={2}
                                                                />
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn normal-case btn-square btn-ghost">
                                                            <span className="block">
                                                                <Confetti
                                                                    size={24}
                                                                    stroke={2}
                                                                />
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
                                                <ChatCenteredText
                                                    size={24}
                                                    stroke={2}
                                                />
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn normal-case w-full btn-ghost">
                                            <span className="block">
                                                <ArrowsClockwise
                                                    size={24}
                                                    stroke={2}
                                                />
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn normal-case w-full btn-ghost">
                                            <span className="block">
                                                <PaperPlaneTilt
                                                    size={24}
                                                    stroke={2}
                                                />
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
