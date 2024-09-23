'use client'

import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

const ArticlePage = ({ params }) => {
    const articleSlug = params.slug
    const [articleData, setArticleData] = useState(null)
    useEffect(() => {
        const fetchArticle = async () => {
            const response = await axios.get(`/news/articles/${articleSlug}`)

            setArticleData(response.data.data)
        }
        fetchArticle()
    }, [articleSlug])
    // const handleFollow = e => {
    //     // Follow functionality needs to be defined
    //     console.log('Follow functionality not implemented')
    // }
    return (
        <>
            {articleData && (
                <div className="card bg-base-200 rounded-lg lg:p-5">
                    <div className="mx-5 py-7 flex justify-between gap-4">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                                <div className="avatar">
                                    <div className="w-7 rounded-full md:!w-14  w-9">
                                        <img src="https://capecoraltech.edu/wp-content/uploads/2016/01/tutor-8-3.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-base md:text-lg flex items-center gap-2">
                                    Navin Patil
                                    <button
                                        type="button"
                                        className="btn normal-case btn-xs rounded-full btn-outline"
                                        // onClick={handleFollow(user)}
                                    >
                                        <span className="">Follow</span>
                                    </button>
                                </div>
                                <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                                    Founder @ RenewE
                                </div>
                                <div className="text-gray-500 text-xs md:text-sm">
                                    {formatDistanceToNow(
                                        new Date(articleData.published_at),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="mx-7">
                            <img
                                src={articleData.image}
                                alt=""
                                className="w-full cursor-pointer"
                            />
                            <div className="text-3xl font-bold ">
                                {articleData.headline}
                            </div>
                            <div className="text-xl font-bold py-5">
                                {articleData.summary}
                            </div>
                            <div>{articleData.body}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ArticlePage
