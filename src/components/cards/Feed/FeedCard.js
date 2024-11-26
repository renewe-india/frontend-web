'use client'
import React from 'react'
import PostSkeleton from '@/components/skeletons/PostSkeleton'
import FeedPost from './FeedPost'

const FeedCard = ({ posts, isLoading }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 mx-4 mb-2">
                    <span className="text-xs">Latest Posts</span>
                </div>
                <div className="flex-1 ml-2">
                    <div className="divider mt-0 mb-2" />
                </div>
            </div>
            <div className="space-y-4">
                {isLoading ? (
                    <PostSkeleton />
                ) : (
                    posts.map(post => <FeedPost key={post.id} post={post} />)
                )}
            </div>
        </div>
    )
}

export default FeedCard
