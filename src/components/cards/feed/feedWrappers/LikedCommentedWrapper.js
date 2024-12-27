import Avatar from '@/components/ui/AvatarImage'
import MainCard from '@/components/ui/MainCard'
import Link from 'next/link'
import React from 'react'

const LikedCommentedWrapper = ({ author, via, children }) => {
    return (
        <MainCard CardClassName="!p-0 rounded-t-lg flex flex-col">
            <h4 className="p-2 border-b border-neutral-content pb-1">
                <Link
                    href={`/users/${author?.username}`}
                    className="inline-flex items-center space-x-2  w-full">
                    <Avatar
                        avatarUrl={author?.avatar}
                        alt={author?.name}
                        size="sm"
                        isVerified={author?.is_verified}
                        additionalClasses="flex-shrink-0"
                    />

                    <div className="inline-flex items-center min-w-0 flex-grow">
                        <span className="font-bold truncate mr-1">
                            {author?.name}
                        </span>
                        <span className="whitespace-nowrap flex-shrink-0">
                            {via === 'liked'
                                ? 'liked this post.'
                                : 'commented on this.'}
                        </span>
                    </div>
                </Link>
            </h4>
            {children}
        </MainCard>
    )
}

export default LikedCommentedWrapper
