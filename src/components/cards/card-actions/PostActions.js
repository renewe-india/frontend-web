'use client'
import React, { useState } from 'react'
import {
    ThumbsUp,
    ChatCenteredText,
    Repeat,
    PaperPlaneTilt,
    Heart,
    Smiley,
    Handshake,
    Confetti,
} from '@phosphor-icons/react/dist/ssr'
import CommentSection from './comments/CommentSection'

const reactions = [
    {
        icon: <Heart size={20} stroke={2} color="#c81438" weight="fill" />,
        label: 'Love',
    },
    {
        icon: <ThumbsUp size={20} stroke={2} color="#0673c6" weight="fill" />,
        label: 'Like',
    },
    {
        icon: <Smiley size={20} stroke={2} color="#f6911e" weight="fill" />,
        label: 'Smile',
    },
    {
        icon: <Handshake size={20} stroke={2} color="#3a9d23" weight="fill" />,
        label: 'Agree',
    },
    {
        icon: <Confetti size={20} stroke={2} color="#ffd700" weight="fill" />,
        label: 'Celebrate',
    },
]

const PostActions = ({ likes, comments, reposts, url }) => {
    const [showComments, setShowComments] = useState(false)

    return (
        <>
            <div className="mt-2 flex flex-wrap justify-between items-center border-b border-neutral-content pb-1">
                <div className="inline-flex items-center text-xs text-gray-500 flex-1 min-w-0">
                    {likes.count > 0 && (
                        <>
                            <Heart
                                size={20}
                                stroke={2}
                                color="#c81438"
                                weight="fill"
                                className="flex-shrink-0 mr-1"
                            />
                            <span className="block sm:hidden ">
                                {likes.abbreviate_count}
                            </span>
                            <span className="hidden sm:block truncate">
                                Liked by {likes.text}
                            </span>
                        </>
                    )}
                </div>

                <div className="text-xs text-gray-500 flex gap-4 mt-1 sm:mt-0">
                    {comments.count > 0 && (
                        <span>{comments.abbreviate_count} comments</span>
                    )}
                    {reposts > 0 && <span>{reposts} reposts</span>}
                </div>
            </div>

            <div className="grid grid-cols-4 lg:gap-2 gap-0">
                {/* Like Dropdown */}
                <LikeDropdown />

                {/* Comment Button */}
                <ActionButton
                    icon={<ChatCenteredText size={16} />}
                    label="Comment"
                    onClick={() => setShowComments(true)}
                />

                {/* Repost Button with Dropdown */}
                <div className="dropdown dropdown-end text-center">
                    <ActionButton icon={<Repeat size={16} />} label="Repost" />

                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-15 w-60 sm:w-72 p-2 shadow ">
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
                    icon={<PaperPlaneTilt size={16} />}
                    label="Share"
                />
            </div>
            {showComments && (
                <CommentSection url={url} commentsCount={comments.count} />
            )}
        </>
    )
}

const ActionButton = ({ icon, label, tooltip, onClick }) => (
    <div className="tooltip tooltip-top" data-tip={tooltip}>
        <button
            className="btn btn-ghost w-full flex flex-row justify-center items-center relative group "
            onClick={onClick}>
            {icon}
            {label && <span className="hidden sm:block">{label}</span>}{' '}
        </button>
    </div>
)

const LikeDropdown = () => {
    const [selectedReaction, setSelectedReaction] = useState({
        icon: <ThumbsUp size={20} stroke={2} color="currentColor" />,
        label: 'Like',
    })

    return (
        <div className="dropdown dropdown-top dropdown-hover w-full">
            <button className="btn btn-ghost w-full flex justify-center items-center space-x-1 px-0">
                {selectedReaction.icon}
                <span className="hidden sm:block">
                    {selectedReaction.label}
                </span>
            </button>

            <ul className="dropdown-content menu p-2 shadow bg-base-300 rounded-box">
                <div className="flex gap-3">
                    {reactions.map((reaction, index) => (
                        <div
                            key={index}
                            className="tooltip tooltip-top"
                            data-tip={reaction.label}>
                            <button
                                className="btn btn-ghost btn-square hover:scale-125 transition-transform"
                                onClick={() => setSelectedReaction(reaction)}>
                                {reaction.icon}
                            </button>
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    )
}

export default PostActions
