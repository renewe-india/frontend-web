'use client'
import { BookmarkSimple, EyeSlash, Flag } from '@phosphor-icons/react'
import Link from 'next/link'
import React from 'react'
import FollowButton from '@/components/ui/FollowButton'
import MainCard from '@/components/ui/MainCard'
import Avatar from '@/components/ui/AvatarImage'
import { cn, ConditionalRender } from '@/lib/utils'
import OrganizationLogo from '@/components/organization/OrganizationLogo'

const PostHeader = ({ author, authorType, sharedAt, children, className }) => {
    if (authorType === '') return null
    const renderAuthorDetails = () => {
        switch (authorType) {
            case 'user':
                return (
                    <>
                        <Link href={`/users/${author?.username}`}>
                            <div className="flex items-center gap-3">
                                <Avatar
                                    avatarUrl={author?.avatar}
                                    alt={author?.name}
                                    size="base"
                                    isVerified={author?.is_verified}
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">
                                        {author?.name}
                                    </span>
                                    <span className="text-xs text-gray-500 max-w-[100px] sm:max-w-md truncate">
                                        {author?.headline}
                                    </span>
                                    <ConditionalRender condition={sharedAt}>
                                        <span className="text-xs text-gray-500">
                                            {sharedAt?.formatted}
                                        </span>
                                    </ConditionalRender>
                                </div>
                            </div>
                        </Link>
                        <FollowButton
                            entityType="users"
                            entityName={author?.username}
                            isFollowing={author?.is_following}
                        />
                    </>
                )
            case 'staff':
                return (
                    <div className="flex items-start gap-3">
                        <Avatar
                            avatarUrl={author?.avatar}
                            alt={author?.name}
                            size="base"
                            isVerified={author?.is_verified}
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">
                                {author?.name}
                            </span>
                            <span className="text-xs text-gray-500 max-w-[100px] sm:max-w-md truncate">
                                {author?.headline}
                            </span>
                        </div>
                    </div>
                )
            case 'organization':
                return (
                    <>
                        <Link href={`/${author.type}/${author?.name}`}>
                            <div className="flex items-start gap-3">
                                <OrganizationLogo
                                    LogoUrl={author?.logo}
                                    alt={author?.display_name}
                                    size="base"
                                    isVerified={author?.is_verified}
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">
                                        {author?.display_name}
                                    </span>
                                    <span className="text-xs text-gray-500 max-w-[100px] sm:max-w-md truncate">
                                        {author?.tagline}
                                    </span>{' '}
                                    <ConditionalRender condition={sharedAt}>
                                        <span className="text-xs text-gray-500">
                                            {sharedAt?.formatted}
                                        </span>
                                    </ConditionalRender>
                                </div>
                            </div>
                        </Link>
                        <FollowButton
                            entityType="organizations"
                            entityName={author?.name}
                            isFollowing={author?.is_following}
                        />
                    </>
                )
            default:
                return null
        }
    }

    return (
        <MainCard CardClassName="card-bordered !p-2">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-between w-full">
                    {renderAuthorDetails()}
                </div>

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
            <div className={cn(className)}> {children}</div>
        </MainCard>
    )
}

export default PostHeader
