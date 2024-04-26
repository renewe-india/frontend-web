'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import {
    DotsThreeOutlineVertical,
    PencilSimpleLine,
    X,
} from '@phosphor-icons/react'

const ArticlePage = ({ params }) => {
    const articleSlug = params.slug
    const { getArticle, deleteNews } = useAuth({
        middleware: 'auth',
    })
    const [articleData, setArticleData] = useState(null)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getArticle({ articleSlug })
                setArticleData(data)
            } catch (error) {
                console.error('Error fetching article data:', error)
            }
        }
        fetchArticle()
    }, [articleSlug])

    const handleDelete = articleSlug => e => {
        e.preventDefault()
        deleteNews({ articleSlug })
        console.log(articleSlug)
    }
    const handleEdit = e => {
        e.preventDefault()
        createNews({ setErrors, formData })
        console.log(formData)
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5">
            <div className="mx-5 py-7 flex justify-between gap-4">
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        <div className="avatar">
                            <div className="w-7 rounded-full md:!w-14  w-9">
                                <img src="https://capecoraltech.edu/wp-content/uploads/2016/01/tutor-8-3.jpg" />
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div>
                        <div className="font-bold text-base md:text-lg flex items-center gap-2">
                            Navin Patil
                            <button
                                type="button"
                                className="btn normal-case btn-xs rounded-full btn-outline">
                                <span className="">Follow</span>
                            </button>
                        </div>
                        <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                            Founder @ RenewE
                        </div>
                        <div className="text-gray-500 text-xs md:text-sm">
                            2 min ago
                        </div>
                    </div>
                </div>
                <div className="flex  items-start">
                    <details className="dropdown dropdown-end">
                        <summary className="m-1 btn">
                            <DotsThreeOutlineVertical size={24} stroke={2} />
                        </summary>
                        <ul className="p-2  menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li>
                                <div onClick={handleDelete(articleSlug)}>
                                    <X color="red" /> Delete
                                </div>
                            </li>
                            <li>
                                <div onClick={handleEdit}>
                                    <PencilSimpleLine color="red" /> Edit
                                </div>
                            </li>
                        </ul>
                    </details>
                </div>
            </div>
            <div className="flex gap-2">
                {articleData && (
                    <div className="mx-7">
                        <img
                            src={articleData.image}
                            alt=""
                            className="w-full cursor-pointer"
                        />
                        <h2 className="text-xl font-bold">
                            {articleData.headline}
                        </h2>
                        <div>{articleData.summary}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArticlePage
