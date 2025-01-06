'use client'
import React, { useState } from 'react'
import Avatar from '@/components/ui/AvatarImage'
import {
    DotsThree,
    EyeSlash,
    Flag,
    Pencil,
    ThumbsUp,
} from '@phosphor-icons/react'
import Link from 'next/link'
import DeleteButton from '@/components/ui/DeleteButton'
import { cn, ConditionalRender } from '@/lib/utils'

const CommentItem = ({ comment, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedComment, setEditedComment] = useState(comment?.comment)

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        if (editedComment !== comment?.comment) {
            onEdit(comment?.uuid, editedComment)
        }
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedComment(comment?.comment)
        setIsEditing(false)
    }

    return (
        <div
            key={comment?.uuid}
            className="flex items-start gap-4 py-4 border-b border-gray-200">
            <Avatar
                avatarUrl={comment?.author?.avatar}
                alt={comment?.author?.name}
                size="base"
                isVerified={comment?.author?.is_verified}
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                        <Link href={`/users/${comment?.author?.username}`}>
                            <div className="flex flex-col">
                                <h4 className="font-semibold">
                                    {comment?.author?.name}
                                </h4>
                                <span className="text-sm text-gray-500">
                                    {comment?.author?.headline}
                                </span>
                            </div>
                        </Link>
                        <div className="text-sm text-gray-500 sm:ml-auto sm:mr-4">
                            {comment?.published_at?.formatted}
                        </div>
                    </div>

                    <ConditionalRender condition={!isEditing}>
                        <div className="dropdown dropdown-end">
                            <button
                                tabIndex={0}
                                className="btn btn-ghost btn-sm">
                                <DotsThree size={20} />
                            </button>
                            <ul
                                tabIndex={0}
                                className="z-10 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
                                <li>
                                    <button
                                        onClick={handleEdit}
                                        className="btn btn-sm btn-ghost flex justify-start shadow-none border-none">
                                        <Pencil size={24} />
                                        <span>Edit</span>
                                    </button>
                                </li>
                                <li>
                                    <DeleteButton
                                        style="btn-ghost flex justify-start shadow-none border-none"
                                        name={' comment'}
                                        itemName={comment?.uuid}
                                        onDelete={() => onDelete(comment?.uuid)}
                                    />
                                </li>
                                <li>
                                    <button className="btn btn-sm btn-ghost flex justify-start shadow-none border-none">
                                        <EyeSlash size={24} />
                                        <span>I don't want to see this</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-sm btn-ghost flex justify-start shadow-none border-none">
                                        <Flag size={24} />
                                        <span>Report</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </ConditionalRender>
                </div>

                {!isEditing ? (
                    <p className="mt-2">{comment?.comment}</p>
                ) : (
                    <div className="mt-2">
                        <textarea
                            value={editedComment}
                            onChange={e => setEditedComment(e.target.value)}
                            className="textarea textarea-bordered w-full"
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleSave}
                                disabled={
                                    editedComment?.trim() ===
                                    comment?.comment?.trim()
                                }
                                className="btn btn-sm btn-primary">
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="btn btn-sm btn-ghost">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                <ConditionalRender condition={comment?.contentImage}>
                    <img
                        src={comment?.contentImage}
                        alt="Content"
                        className="mt-2 rounded-lg max-w-full h-auto"
                    />
                </ConditionalRender>
                <ConditionalRender condition={!isEditing}>
                    <div
                        className={cn(
                            'flex items-center gap-4 mt-2 text-sm text-gray-500',
                        )}>
                        <button className="flex items-center gap-1">
                            <ThumbsUp size={16} /> Like
                        </button>
                        <button className="flex items-center gap-1">
                            | Reply
                        </button>
                    </div>
                </ConditionalRender>
            </div>
        </div>
    )
}

export default CommentItem
