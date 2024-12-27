import React from 'react'
import Avatar from '@/components/ui/AvatarImage'
import { DotsThree, EyeSlash, Flag, ThumbsUp } from '@phosphor-icons/react'

const CommentItem = ({ comment }) => {
    return (
        <div
            key={comment.id}
            className="flex items-start gap-4 py-4 border-b border-gray-200">
            <Avatar
                avatarUrl={comment.author.avatar}
                alt={comment.author.name}
                size="base"
                isVerified={comment.author.is_verified}
                additionalClasses=""
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold">{comment.author.name}</h4>
                        <span className="text-sm text-gray-500">
                            {comment.headline}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">15 min ago</div>
                </div>
                <p className="mt-2">{comment.comment}</p>
                {comment.contentImage && (
                    <img
                        src={comment.contentImage}
                        alt="Content"
                        className="mt-2 rounded-lg max-w-full h-auto"
                    />
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <button className="flex items-center gap-1">
                        <ThumbsUp size={16} /> Like
                    </button>
                    <button className="flex items-center gap-1">| Reply</button>
                </div>
            </div>
            <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-sm">
                    <DotsThree size={20} />
                </button>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <button className="flex items-center gap-2">
                            <EyeSlash size={24} />
                            <span>I don't want to see this</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center gap-2">
                            <Flag size={24} />
                            <span>Report</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CommentItem
