import React from 'react'
import Avatar from '@/components/ui/AvatarImage'
import {
    DotsThree,
    EyeSlash,
    Flag,
    // Pencil,
    ThumbsUp,
} from '@phosphor-icons/react'
import Link from 'next/link'
// import DeleteButton from '@/components/ui/DeleteButton'

const CommentItem = ({ comment }) => {
    return (
        <div
            key={comment?.id}
            className="flex items-start gap-4 py-4 border-b border-gray-200">
            <Avatar
                avatarUrl={comment?.author?.avatar}
                alt={comment?.author?.name}
                size="base"
                isVerified={comment?.author?.is_verified}
                additionalClasses=""
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <Link href={`/users/${comment?.author?.username}`}>
                        <h4 className="font-semibold">
                            {comment?.author?.name}
                        </h4>
                        <span className="text-sm text-gray-500">
                            {comment?.author?.headline}
                        </span>
                    </Link>
                    <div className="text-sm text-gray-500">
                        {comment?.published_at?.formatted}
                    </div>
                </div>
                <p className="mt-2">{comment?.comment}</p>
                {comment?.contentImage && (
                    <img
                        src={comment?.contentImage}
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
                    className="z-10 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
                    {/* <li>
                        <button className="flex items-center gap-2">
                            <Pencil size={24} />
                            <span>Edit</span>
                        </button>
                    </li> */}
                    {/* <li>
                        <DeleteButton
                            name={' comment'}
                            itemName={comment?.uuid}
                            onDelete={() => console.log('Delete')}
                        />
                    </li> */}
                    <li>
                        <button className="flex items-center gap-2">
                            <EyeSlash size={24} weight="duotone" />
                            <span>I don't want to see this</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center gap-2">
                            <Flag size={24} weight="duotone" />
                            <span>Report</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CommentItem
