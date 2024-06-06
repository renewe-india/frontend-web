'use client'

import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { useEffect, useRef, useState, useCallback } from 'react'
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
    const { articles: initialArticles } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/news',
    })
    const [articles, setArticles] = useState(initialArticles || [])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const observer = useRef()

    const fetchMoreArticles = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/news/articles?page=${page}`)
            const newArticles = response.data.data
            setArticles(prevArticles => [...prevArticles, ...newArticles])
            setPage(prevPage => prevPage + 1)
        } catch (error) {
            console.error('Error fetching more articles:', error)
        } finally {
            setLoading(false)
        }
    }

    const lastArticleElementRef = useCallback(
        node => {
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    fetchMoreArticles()
                }
            })
            if (node) observer.current.observe(node)
        },
        [loading],
    )

    useEffect(() => {
        if (initialArticles && initialArticles.length > 0) {
            setArticles(initialArticles)
        }
    }, [initialArticles])

    return (
        <>
            <div
                id="main-content"
                className="col-span-12 lg:col-span-8 xl:col-span-6">
                <div className="space-y-2">
                    <NewsForm />
                    {articles.map((article, index) => (
                        <div
                            key={index}
                            ref={
                                index === articles.length - 1
                                    ? lastArticleElementRef
                                    : null
                            }
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
                                                {article.author} and{' '}
                                                {article.likes} others
                                            </div>
                                            <div className="text-xs text-gray-500 flex gap-4">
                                                <div>
                                                    {article.comments} comments
                                                </div>
                                                <div>
                                                    {article.reposts} reposts
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4">
                                            <div className="dropdown normal-case w-full">
                                                <div tabIndex={0} role="button">
                                                    <button
                                                        type="button"
                                                        className="btn normal-case w-full">
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
                                                    className="btn dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-85">
                                                    <div>
                                                        <div className="flex gap-3">
                                                            <button
                                                                type="button"
                                                                className="normal-case btn-square btn-ghost">
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
                    {loading && (
                        <p className="text-xl text-black">
                            Loading more articles...
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default News
