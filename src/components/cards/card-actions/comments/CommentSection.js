'use client'

import React, { useState, useEffect } from 'react'
import { getPaginatedData } from '@/actions/get-paginated-data'
import CommentInput from './CommentInput'
import { useUser } from '@/context/UserContext'
import CommentItem from './CommentItem'
import Spinner from '@/components/ui/Spinner'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ui/ErrorDisplay'

const CommentSection = ({ commentsCount, url }) => {
    const { user } = useUser()
    const [comments, setComments] = useState([])
    const [userComment, setUserComment] = useState('')
    const [userImage, setUserImage] = useState(null)
    const [page, setPage] = useState(0)
    const [lastPage, setLastPage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [errors, setErrors] = useState(null)

    const fetchComments = async pageNumber => {
        try {
            setIsLoading(true)
            const { data, meta } = await getPaginatedData(
                pageNumber,
                `${url}/comments`,
            )
            setComments(prev => (pageNumber === 1 ? data : [...prev, ...data]))
            setLastPage(meta.last_page)
            setPage(pageNumber)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (commentsCount !== 0) fetchComments(1)
    }, [])

    const handleLoadMore = () => {
        if (page < lastPage && !isLoading) {
            fetchComments(page + 1)
        }
    }

    const handlePostComment = async () => {
        if (userComment.trim() === '') return

        const response = await axios.post(`${url}/comments`, {
            comment: userComment,
        })
        const newComment = response.data.data

        setComments(prevComments => [newComment, ...prevComments])
        setUserComment('')
        setUserImage(null)
    }

    const handleDelete = async uuid => {
        try {
            await axios.delete(`${url}/comments/${uuid}`)
            setComments(prevComments =>
                prevComments.filter(comment => comment.uuid !== uuid),
            )
        } catch (err) {
            setErrors(err.response.data.message)
        }
    }

    const handleEdit = async (uuid, newComment) => {
        try {
            await axios.patch(`${url}/comments/${uuid}`, {
                comment: newComment,
            })

            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.uuid === uuid
                        ? { ...comment, comment: newComment }
                        : comment,
                ),
            )
        } catch (err) {
            setErrors(err.response.data.message)
        }
    }
    if (!user) {
        router.push('/login')
        return null
    }

    return (
        <div className="bg-inherit rounded-lg shadow p-4 m-2">
            <CommentInput
                user={user}
                userComment={userComment}
                setUserComment={setUserComment}
                userImage={userImage}
                setUserImage={setUserImage}
                handlePostComment={handlePostComment}
            />
            <ErrorDisplay errors={errors} onClose={() => setErrors(null)} />
            <div>
                {isLoading ? (
                    <div className="flex justify-center mt-4">
                        <Spinner />
                    </div>
                ) : comments.length > 0 ? (
                    comments.map((comment, idx) => (
                        <CommentItem
                            key={idx}
                            comment={comment}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))
                ) : (
                    <div className="text-sm text-gray-500">
                        Be the first to comment on this post.
                    </div>
                )}
            </div>
            <LoadMoreButton
                isLoading={isLoading}
                handleLoadMore={handleLoadMore}
                hasMore={page < lastPage}
            />
        </div>
    )
}

const LoadMoreButton = ({ isLoading, handleLoadMore, hasMore }) => {
    return (
        hasMore && (
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleLoadMore}
                    className="btn btn-outline btn-sm"
                    disabled={isLoading}>
                    {isLoading ? <Spinner /> : 'Load More Comments'}
                </button>
            </div>
        )
    )
}
export default CommentSection
