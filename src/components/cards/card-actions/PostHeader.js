'use client'
import Image from '@/components/Image'
import { BookmarkSimple, EyeSlash, Flag } from '@phosphor-icons/react'
import Link from 'next/link'
import React from 'react'
import FollowButton from '@/components/ui/FollowButton'

const PostHeader = ({ author, sharedAt, children, className }) => {
    return (
        <div className="card card-bordered shadow-md bg-base-200 rounded-lg">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-start gap-3">
                    <Link href={`/users/${author?.username}`}>
                        <div className="flex items-start gap-3">
                            <Image
                                data={author?.avatar}
                                src="https://capecoraltech.edu/wp-content/uploads/2016/01/tutor-8-3.jpg"
                                alt={author?.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex flex-col">
                                <span className="font-semibold">
                                    {author?.name}
                                </span>
                                {sharedAt && (
                                    <span className="text-sm text-gray-500">
                                        {sharedAt}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                    <FollowButton
                        entityType={'users'}
                        entityName={author?.username}
                        isFollowing={author?.is_following}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="dropdown dropdown-end">
                        <button tabIndex={0} className="btn btn-ghost btn-sm">
                            ⋮
                        </button>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-40">
                            <li>
                                <button className="flex items-center gap-2">
                                    <BookmarkSimple size={24} />
                                    Save Post
                                </button>
                            </li>
                            <li>
                                <button className="flex items-center gap-2">
                                    <EyeSlash size={24} />
                                    Hide Post
                                </button>
                            </li>
                            <li>
                                <button className="flex items-center gap-2">
                                    <Flag size={24} />
                                    Report
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={className}> {children}</div>
        </div>
    )
}

export default PostHeader
