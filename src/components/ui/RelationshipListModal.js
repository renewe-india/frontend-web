'use client'

import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import ErrorDisplay from './ErrorDisplay'
import { UserCircleCheck, Users } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import FollowButton from './FollowButton'
import { useInView } from 'react-intersection-observer'
import { getPaginatedData } from '@/actions/get-paginated-data'
import Avatar from './AvatarImage'
import { ConditionalRender } from '@/lib/utils'

function RelationshipListModal({
    count,
    entityName,
    entityType,
    relationshipType = 'followed-by',
}) {
    const modalId = `${relationshipType}-modal-${entityName}`
    const [relationships, setRelationships] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState()
    const { ref, inView } = useInView()

    const getRelationships = async () => {
        setLoading(true)
        try {
            const { data, meta } = await getPaginatedData(
                page,
                `/${entityType}/${entityName}/${relationshipType}/users`,
            )

            setRelationships(data)
            setLastPage(meta.last_page)
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                    `Failed to fetch ${relationshipType}.`,
            )
        } finally {
            setLoading(false)
        }
    }

    const openModal = () => {
        const modal = document.getElementById(modalId)
        modal.showModal()
        if (relationships.length === 0 && count?.count > 0) {
            getRelationships()
        }
    }

    const loadMoreRelationships = async () => {
        try {
            const nextPage = page + 1
            const { data: newRelationships, meta } = await getPaginatedData(
                nextPage,
                `/${entityType}/${entityName}/${relationshipType}/users`,
            )

            setRelationships(prev => [...prev, ...newRelationships])
            setLastPage(meta.last_page)
            setPage(nextPage)
        } catch (error) {
            setError(`Failed to load more ${relationshipType}.`)
        }
    }

    useEffect(() => {
        if (inView && page < lastPage) {
            loadMoreRelationships()
        }
    }, [inView])

    return (
        <>
            {/* Button to Open Relationship Modal */}
            <button
                onClick={openModal}
                className="link link-hover inline-flex gap-2 text-left">
                <Users weight="fill" size={'20'} className="flex-shrink-0" />
                <ConditionalRender condition={count?.count > 0}>
                    {relationshipType === 'followed-by' ? (
                        <>
                            {count?.abbreviate_count} followers • {count?.text}
                        </>
                    ) : (
                        <>0 {relationshipType}</>
                    )}
                </ConditionalRender>
                <ConditionalRender condition={count?.count === 0}>
                    <>You do not have any follower.</>
                </ConditionalRender>
            </button>

            {/* Relationship Modal */}
            <dialog id={modalId} className="modal">
                <div className="modal-box pt-0 max-w-lg">
                    <div className="sticky top-0 bg-base-100 py-4 z-30 ">
                        <span className="text-2xl font-bold flex gap-2 flex-shrink-0">
                            <UserCircleCheck
                                weight="duotone"
                                size={32}
                                color="#00a400"
                                className="flex-shrink-0 bg-green-100 rounded-full p-1"
                            />
                            {relationshipType === 'followed-by' ? (
                                <>Followers</>
                            ) : (
                                <> {relationshipType}</>
                            )}
                        </span>{' '}
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                    </div>

                    <ErrorDisplay
                        errors={error}
                        onClose={() => setError(null)}
                    />
                    <ConditionalRender condition={loading}>
                        <div className="flex items-center justify-center">
                            <Spinner />
                        </div>
                    </ConditionalRender>
                    <ConditionalRender
                        condition={relationships && relationships.length > 0}>
                        <ul className="mt-4 space-y-2  h-auto">
                            {relationships.map(relationship => (
                                <li
                                    key={relationship?.username}
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 bg-base-300 rounded-md">
                                    <Link
                                        href={`/users/${relationship?.username}`}
                                        className="flex items-center">
                                        <Avatar
                                            avatarUrl={relationship?.avatar}
                                            alt={relationship?.name}
                                            size="base"
                                            isVerified={
                                                relationship?.is_verified
                                            }
                                        />
                                        <div className="ml-4 max-w-[200px] sm:max-w-[350px]">
                                            <h2 className="card-title text-base font-semibold flex items-center">
                                                {relationship?.name}
                                            </h2>
                                            <ConditionalRender
                                                condition={
                                                    relationship?.headline
                                                }>
                                                <p className="text-sm text-gray-600 truncate">
                                                    {relationship?.headline}
                                                </p>
                                            </ConditionalRender>
                                            <ConditionalRender
                                                condition={
                                                    relationship?.followed_by
                                                        ?.count > 0
                                                }>
                                                <div className="flex items-start text-gray-600 mb-2">
                                                    <Users
                                                        size={16}
                                                        className="mr-2 flex-shrink-0"
                                                        weight="fill"
                                                    />
                                                    <div className="text-xs lg:text-sm">
                                                        <span>
                                                            {
                                                                relationship
                                                                    ?.followed_by
                                                                    ?.abbreviate_count
                                                            }{' '}
                                                            followers
                                                        </span>
                                                        <span className="font-semibold">
                                                            {' '}
                                                            •{' '}
                                                        </span>
                                                        <span>
                                                            {
                                                                relationship
                                                                    ?.followed_by
                                                                    ?.text
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </ConditionalRender>
                                        </div>
                                    </Link>

                                    <FollowButton
                                        isFollowing={relationship?.is_following}
                                        entityName={relationship?.username}
                                        entityType="users"
                                        buttonStyle="bg-base-100"
                                    />
                                </li>
                            ))}
                        </ul>
                    </ConditionalRender>
                    <ConditionalRender
                        condition={
                            !(relationships && relationships.length > 0)
                        }>
                        <p className="py-4 text-gray-500">
                            {relationshipType === 'followed-by' ? (
                                <>You do not have any followers.</>
                            ) : (
                                <>You do not have any {relationshipType}.</>
                            )}
                        </p>
                    </ConditionalRender>
                    <ConditionalRender condition={page < lastPage}>
                        <div
                            className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
                            ref={ref}>
                            <Spinner />
                        </div>
                    </ConditionalRender>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default RelationshipListModal
