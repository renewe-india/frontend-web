'use client'
import React, { useState } from 'react'
import {
    ThumbsUp,
    ChatCenteredText,
    Repeat,
    PaperPlaneTilt,
} from '@phosphor-icons/react/dist/ssr'
import CommentSection from './comments/CommentSection'
import ReactionSection from './reactions/ReactionSection'
import { ConditionalRender } from '@/lib/utils'

const PostActions = ({ reactions, comments, reposts, url }) => {
    const [showComments, setShowComments] = useState(false)
    const [commentCount, setCommentCount] = useState(comments?.count || 0)

    const updateCommentCount = newCount => {
        setCommentCount(newCount)
    }

    return (
        <>
            <div className="mt-4 flex flex-wrap justify-between items-center border-b border-neutral-content pb-1">
                <div className="inline-flex items-center text-xs text-gray-500 flex-1 space-x-2 min-w-0">
                    <ConditionalRender condition={reactions?.count > 0}>
                        <>
                            <ThumbsUp
                                size={20}
                                stroke={2}
                                color="#1E90FF"
                                weight="duotone"
                                className="p-1 bg-blue-100 rounded-full flex-shrink-0"
                            />
                            <span className="block sm:hidden ">
                                {reactions?.abbreviate_count}
                            </span>
                            <span className="hidden sm:block truncate">
                                Liked by {reactions?.text}
                            </span>
                        </>
                    </ConditionalRender>
                </div>

                <div className="text-xs text-gray-500 flex gap-4 mt-1 sm:mt-0">
                    <ConditionalRender condition={comments?.count > 0}>
                        <span>{commentCount} comments</span>
                    </ConditionalRender>
                    <ConditionalRender condition={reposts > 0}>
                        <span>{reposts} reposts</span>
                    </ConditionalRender>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-4 lg:gap-2 gap-0">
                {/* Like Dropdown */}
                <ReactionSection url={url} />

                {/* Comment Button */}
                <ActionButton
                    icon={<ChatCenteredText size={20} />}
                    label="Comment"
                    onClick={() => setShowComments(true)}
                />

                {/* Repost Button with Dropdown */}
                <div className="dropdown dropdown-end text-center">
                    <ActionButton icon={<Repeat size={20} />} label="Repost" />

                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-20 w-60 sm:w-72 p-2 shadow ">
                        <li>
                            <button className="btn w-full h-16">
                                <div className="flex flex-row text-left items-start gap-5">
                                    <Repeat size={16} className="shrink-0" />
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold">
                                            Repost
                                        </span>
                                        <p>
                                            Instantly Repost this post to share
                                            with others.
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Share Button */}
                <ActionButton
                    icon={<PaperPlaneTilt size={20} />}
                    label="Share"
                />
            </div>
            <ConditionalRender condition={showComments}>
                <CommentSection
                    url={url}
                    commentsCount={comments?.count}
                    onUpdateCommentCount={updateCommentCount}
                />
            </ConditionalRender>
        </>
    )
}

const ActionButton = ({ icon, label, tooltip, onClick }) => (
    <div className="tooltip tooltip-top" data-tip={tooltip}>
        <button
            className="btn btn-ghost btn-sm w-full flex flex-row justify-center items-center relative group "
            onClick={onClick}>
            {icon}
            {label && <span className="hidden sm:block">{label}</span>}{' '}
        </button>
    </div>
)

export default PostActions
