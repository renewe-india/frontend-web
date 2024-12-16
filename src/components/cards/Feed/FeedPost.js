import React, { useState } from 'react'
import Image from '@/components/Image'
import dynamic from 'next/dynamic'
import DescriptionWithToggle from '@/components/cards/card-actions/DescriptionWithToggle'
import PostActions from '../card-actions/PostActions'
import PostHeader from '../card-actions/PostHeader'

const CommentSection = dynamic(() => import('../card-actions/CommentSection'))

const FeedPost = ({ post }) => {
    const [showComments, setShowComments] = useState(false)

    return (
        <PostHeader
            author={{
                avatar: { url: post.authorImage },
                name: post.authorName,
            }}
            sharedAt={post.postTime}>
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
                onCommentClick={() => setShowComments(true)}
            />

            {showComments && <CommentSection postId={post.id} />}
        </PostHeader>
    )
}

export default FeedPost
