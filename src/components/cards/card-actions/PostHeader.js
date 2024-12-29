'use client'
import { BookmarkSimple, EyeSlash, Flag } from '@phosphor-icons/react'
import Link from 'next/link'
import React from 'react'
import FollowButton from '@/components/ui/FollowButton'
import MainCard from '@/components/ui/MainCard'
import Avatar from '@/components/ui/AvatarImage'

const PostHeader = ({ author, sharedAt, children, className }) => {
    return (
        <MainCard CardClassName="card-bordered">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-start gap-3">
                    <Link href={`/users/${author?.username}`}>
                        <div className="flex items-center gap-3">
                            <Avatar
                                avatarUrl={author?.avatar}
                                alt={author?.name}
                                size="base"
                                isVerified={author?.is_verified}
                                border={true}
                                additionalClasses="flex-shrink-0"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold ">
                                    {author?.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {author?.headline}
                                </span>
                                {sharedAt && (
                                    <span className="text-sm text-gray-500">
                                        {sharedAt?.formatted}
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
        </MainCard>
    )
}

export default PostHeader
