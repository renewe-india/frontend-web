'use client'
import React from 'react'
import Image from '@/components/Image'
import DescriptionWithToggle from '@/components/cards/card-actions/DescriptionWithToggle'
import PostActions from '../card-actions/PostActions'
import PostHeader from '../card-actions/PostHeader'

function FeedPost({ post }) {
    return (
        <PostHeader
            author={{
                avatar: { url: post.authorImage },
                name: post.authorName,
            }}
            sharedAt={post.shared_at}>
            {/* Post Description */}
            <div className="px-4 pb-4">
                <DescriptionWithToggle description={post.description} />
            </div>

            {/* Post Image */}
            <figure className="relative w-full aspect-video overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    customClass="absolute inset-0 w-full h-full object-contain"
                />
            </figure>

            {/* Post Actions */}

            <PostActions
                likes={post.likes}
                comments={post.comments}
                reposts={post.reposts}
            />
        </PostHeader>
    )
}

export default FeedPost
