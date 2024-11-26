import React, { useState } from 'react'
import DescriptionWithToggle from './DescriptionWithToggle'
import { BookmarkSimple, EyeSlash, Flag } from '@phosphor-icons/react'
import Image from '@/components/Image'
import dynamic from 'next/dynamic'

const PostActions = dynamic(() => import('./PostActions'), { ssr: false })
const CommentSection = dynamic(() => import('./CommentSection'), { ssr: false })
const FeedPost = ({ post }) => {
    const [showComments, setShowComments] = useState(false)

    return (
        <div className="card card-bordered shadow-md bg-base-200 rounded-lg">
            {/* Author Info */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <img
                        src={post.authorImage}
                        alt={post.authorName}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h4 className="font-semibold">{post.authorName}</h4>
                        <span className="text-sm text-gray-500">
                            {post.postTime}
                        </span>
                    </div>
                </div>
                <PostOptions />
            </div>

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
            <div className="p-4">
                <PostActions
                    likes={post.likes}
                    comments={post.comments}
                    reposts={post.reposts}
                    onCommentClick={() => setShowComments(prev => !prev)}
                />
            </div>
            {showComments && <CommentSection postId={post.id} />}
        </div>
    )
}

const PostOptions = () => (
    <div className="flex items-center gap-3">
        <button className="btn btn-sm text-primary shadow-none">
            + Follow
        </button>
        <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-sm">
                ⋮
            </button>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
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
)

export default FeedPost
