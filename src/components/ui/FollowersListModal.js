'use client'

import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import ErrorDisplay from './ErrorDisplay'
import Image from '../Image'
import { Users } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import FollowButton from './FollowButton'
import { useInView } from 'react-intersection-observer'
import { getPaginatedData } from '@/actions/get-paginated-data'

function FollowersListModal({
    modalId = 'followers_modal',
    followersCount,
    entityName,
    entityType,
}) {
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState()
    const { ref, inView } = useInView()

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const getFollowers = async () => {
        setLoading(true)
        try {
            const { data, meta } = await getPaginatedData(
                page,
                `/followers/${entityType}/${entityName}`,
            )
            setFollowers(data)
            setLastPage(meta.last_page)
        } catch (error) {
            setError(
                error?.response?.data?.message || 'Failed to fetch followers.',
            )
        } finally {
            setLoading(false)
        }
    }

    const openModal = () => {
        const modal = document.getElementById(modalId)
        modal.showModal()
        if (followers.length === 0) {
            getFollowers()
        }
    }

    const loadMoreFollowers = async () => {
        try {
            await delay(500)
            const nextPage = page + 1
            const { data: newFollowers, meta } = await getPaginatedData(
                nextPage,
                `/followers/${entityType}/${entityName}`,
            )

            setFollowers(prev => [...prev, ...newFollowers])
            setLastPage(meta.last_page)
            setPage(nextPage)
        } catch (error) {
            setError('Failed to load more followers.')
        }
    }

    useEffect(() => {
        if (inView && page < lastPage) {
            loadMoreFollowers()
        }
    }, [inView])

    if (!followersCount || followersCount.count <= 0) return null

    return (
        <>
            {/* Button to Open Followers Modal */}
            <button
                onClick={openModal}
                className="text-left text-gray-500 text-xs md:text-sm cursor-pointer hover:underline">
                {followersCount?.abbreviate_count} followers •{' '}
                {followersCount?.text}
            </button>

            {/* Followers Modal */}
            <dialog id={modalId} className="modal">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg">Followers</h3>
                    <ErrorDisplay
                        errors={error}
                        onClose={() => setError(null)}
                    />
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Spinner />
                        </div>
                    ) : followers && followers.length > 0 ? (
                        <ul className="mt-4 space-y-2">
                            {followers.map((follower, index) => (
                                <li
                                    key={follower?.username || index}
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 bg-base-300 rounded-md">
                                    <Link
                                        href={`/users/${follower?.username}`}
                                        className="flex items-center">
                                        <Image
                                            data={follower?.avatar}
                                            alt={follower?.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="ml-4 max-w-[200px] sm:max-w-[350px]">
                                            <h2 className="card-title text-base font-semibold flex items-center">
                                                {follower?.name}
                                            </h2>
                                            {follower?.headline && (
                                                <p className="text-sm text-gray-600 truncate">
                                                    {follower?.headline}
                                                </p>
                                            )}
                                            {/* Followers Information */}
                                            {follower?.followers?.count > 0 && (
                                                <div className="flex items-start text-gray-600 mb-2">
                                                    <Users
                                                        size={16}
                                                        className="mr-2 flex-shrink-0"
                                                        weight="fill"
                                                    />
                                                    <div className="text-xs lg:text-sm">
                                                        <span>
                                                            {
                                                                follower
                                                                    ?.followers
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
                                                                follower
                                                                    ?.followers
                                                                    ?.text
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Link>

                                    <FollowButton
                                        isFollowing={follower?.is_following}
                                        entityName={follower?.username}
                                        entityType="users"
                                        buttonStyle="bg-base-100"
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="py-4 text-gray-500">
                            No followers found.
                        </p>
                    )}
                    {page < lastPage && (
                        <div
                            className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
                            ref={ref}>
                            <Spinner />
                        </div>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default FollowersListModal
