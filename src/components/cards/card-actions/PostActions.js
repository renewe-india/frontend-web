'use client'
import React, { useState } from 'react'
import {
    ThumbsUp,
    ChatCenteredText,
    ArrowsClockwise,
    PaperPlaneTilt,
    Heart,
    Smiley,
    Handshake,
    Confetti,
} from '@phosphor-icons/react/dist/ssr'
import CommentSection from './CommentSection'

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

const PostActions = ({ likes, comments, reposts }) => {
    const [showComments, setShowComments] = useState(false)

    return (
        <div className="p-2">
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-1">
                <div className="text-xs text-gray-500">
                    {likes > 0 && <span>{likes} Likes</span>}
                </div>

                <div className="text-xs text-gray-500 flex gap-4">
                    {comments > 0 && <span>{comments} comments</span>}
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
                    <ActionButton
                        icon={<ArrowsClockwise size={16} />}
                        label="Repost"
                    />

                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-60 sm:w-72 p-2 shadow ">
                        <li>
                            <button className="btn w-full h-16">
                                <div className="flex flex-row text-left items-start gap-5">
                                    <ArrowsClockwise
                                        size={16}
                                        className="shrink-0"
                                    />
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
            {showComments && <CommentSection />}
        </div>
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
