'use client'
import Avatar from '@/components/ui/AvatarImage'
import MainCard from '@/components/ui/MainCard'
import Link from 'next/link'
import React from 'react'
import { cn, ConditionalRender } from '@/lib/utils'
import OrganizationLogo from '@/components/organization/OrganizationLogo'

const LikedCommentedWrapper = ({ author, authorType, via, children }) => {
    const renderAuthorDetails = () => {
        if (authorType === 'organization') {
            return (
                <>
                    <Avatar
                        avatarUrl={author?.logo}
                        alt={author?.display_name}
                        size="sm"
                    />
                    <div className="inline-flex items-center min-w-0 flex-grow">
                        <span className="font-bold truncate mr-1">
                            {author?.display_name}
                        </span>
                        <ConditionalRender condition={via}>
                            <span className="whitespace-nowrap flex-shrink-0">
                                {via === 'liked'
                                    ? 'liked this post.'
                                    : 'commented on this.'}
                            </span>
                        </ConditionalRender>
                    </div>
                </>
            )
        } else if (authorType === 'user') {
            return (
                <>
                    <OrganizationLogo
                        LogoUrl={author?.avatar}
                        alt={author?.name}
                        size="sm"
                        isVerified={author?.is_verified}
                    />
                    <div className="inline-flex items-center min-w-0 flex-grow">
                        <span className="font-bold truncate mr-1">
                            {author?.name}
                        </span>
                        <ConditionalRender condition={via}>
                            <span className="whitespace-nowrap flex-shrink-0">
                                {via === 'liked'
                                    ? 'liked this post.'
                                    : 'commented on this.'}
                            </span>
                        </ConditionalRender>
                    </div>
                </>
            )
        }
    }

    return (
        <MainCard CardClassName={cn('p-0 rounded-t-lg flex flex-col')}>
            <ConditionalRender condition={authorType === null}>
                <h4 className="p-2 border-b border-neutral-content pb-1">
                    <Link
                        href={
                            authorType === 'user'
                                ? `/users/${author?.username}`
                                : `/${authorType}/${author?.name}`
                        }
                        className="inline-flex items-center space-x-2 w-full">
                        {renderAuthorDetails()}
                    </Link>
                </h4>
            </ConditionalRender>
            {children}
        </MainCard>
    )
}

export default LikedCommentedWrapper
