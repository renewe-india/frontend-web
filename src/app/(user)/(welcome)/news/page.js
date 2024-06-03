'use client'

import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import {
    ArrowsClockwise,
    ChatCenteredText,
    Confetti,
    Handshake,
    Heart,
    PaperPlaneTilt,
    Smiley,
    ThumbsUp,
    X,
} from '@phosphor-icons/react'

import Link from 'next/link'
import NewsForm from '@/components/NewsForm'
const News = () => {
    const { articles } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/news',
    })
    const [errors, setErrors] = useState([])

    return (
        <>
            <div
                id="main-content"
                className="col-span-12 lg:col-span-8 xl:col-span-6">
                <div className="space-y-2">
                    <NewsForm />
                    <div className="card bg-base-200 rounded-lg p-5">
                        <div>
                            <div className="flex flex-col gap-2">
                                <div className="mx-7 flex gap-2">
                                    <img
                                        src="https://picsum.photos/300/300"
                                        alt=""
                                        className=" w-24 h-24 rounded cursor-pointer"
                                    />
                                    <div className="px-2">
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
                                    {/* <div className="badge">Solar Energy</div>
                                    <div className="badge">India</div> */}
                                </div>
                                <div>
                                    <div className="mx-7 flex justify-between border-b border-gray-200 dark:border-gray-600 pb-1">
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
                    {articles.map((article, index) => (
                        <div
                            key={index}
                            className="card bg-base-200 rounded-lg p-5">
                            <div>
                                <div className="flex flex-col gap-2">
                                    <div className="ml-7 flex gap-2">
                                        {article.image && (
                                            <img
                                                src={article.image}
                                                alt=""
                                                className="w-24 h-24 rounded cursor-pointer"
                                            />
                                        )}
                                        <Link href={`/news/${article.slug}`}>
                                            <div className="px-2">
                                                <h2 className="text-xl font-bold">
                                                    {article.headline}
                                                </h2>
                                                <div>{article.summary}</div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <div className="mx-7 flex justify-between border-b border-gray-200 dark:border-gray-600 pb-1">
                                            <div className="text-xs text-gray-500">
                                                Satender Ahirwar and 1,441
                                                others
                                            </div>
                                            <div className="text-xs text-gray-500 flex gap-4">
                                                <div>77 comments</div>
                                                <div>5 reposts</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4">
                                            <div className="dropdown normal-case w-full ">
                                                <div tabIndex={0} role="button">
                                                    <button
                                                        type="button"
                                                        className="btn btn-ghost normal-case w-full ">
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
                                                                        size={
                                                                            24
                                                                        }
                                                                        stroke={
                                                                            2
                                                                        }
                                                                    />
                                                                </span>
                                                                {/* LABEL / SLOT */}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn normal-case btn-square btn-ghost">
                                                                <span className="block">
                                                                    <ThumbsUp
                                                                        size={
                                                                            24
                                                                        }
                                                                        stroke={
                                                                            2
                                                                        }
                                                                    />
                                                                </span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn normal-case btn-square btn-ghost">
                                                                <span className="block">
                                                                    <Smiley
                                                                        size={
                                                                            24
                                                                        }
                                                                        stroke={
                                                                            2
                                                                        }
                                                                    />
                                                                </span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn normal-case btn-square btn-ghost">
                                                                <span className="block">
                                                                    <Handshake
                                                                        size={
                                                                            24
                                                                        }
                                                                        stroke={
                                                                            2
                                                                        }
                                                                    />
                                                                </span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn normal-case btn-square btn-ghost">
                                                                <span className="block">
                                                                    <Confetti
                                                                        size={
                                                                            24
                                                                        }
                                                                        stroke={
                                                                            2
                                                                        }
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
                    ))}
                </div>
            </div>
        </>
    )
}

export default News
