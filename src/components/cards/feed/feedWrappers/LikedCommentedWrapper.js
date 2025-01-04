import Avatar from '@/components/ui/AvatarImage'
import MainCard from '@/components/ui/MainCard'
import Link from 'next/link'
import React from 'react'
import { cn, ConditionalRender } from '@/lib/utils'

const LikedCommentedWrapper = ({ author, via, children }) => {
    return (
        <MainCard CardClassName={cn('!p-0 rounded-t-lg flex flex-col')}>
            <h4 className="p-2 border-b border-neutral-content pb-1">
                <Link
                    href={`/users/${author?.username}`}
                    className="inline-flex items-center space-x-2 w-full">
                    <Avatar
                        avatarUrl={author?.avatar}
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
                </Link>
            </h4>
            {children}
        </MainCard>
    )
}

export default LikedCommentedWrapper
