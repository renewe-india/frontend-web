import React from 'react'
import {
    ThumbsUp,
    ChatCenteredText,
    ArrowsClockwise,
    PaperPlaneTilt,
    Heart,
    Smiley,
    Handshake,
    Confetti,
} from '@phosphor-icons/react'

const PostActions = ({ likes, comments, reposts, onCommentClick }) => (
    <div className="grid grid-cols-4 gap-2">
        {/* Like Dropdown */}
        <LikeDropdown likes={likes} />

        {/* Comment Button */}
        <ActionButton
            icon={<ChatCenteredText size={24} />}
            label={comments}
            tooltip="Comment"
            onClick={onCommentClick} // Pass the click handler
        />

        {/* Repost Button */}
        <ActionButton
            icon={<ArrowsClockwise size={24} />}
            label={reposts}
            tooltip="Repost"
        />

        {/* Share Button */}
        <ActionButton icon={<PaperPlaneTilt size={24} />} tooltip="Share" />
    </div>
)

const ActionButton = ({ icon, label, tooltip, onClick }) => (
    <button
        className="btn btn-ghost w-full flex justify-center items-center relative group"
        onClick={onClick} // Attach onClick handler
    >
        {icon}
        {label && <span className="ml-2">{label}</span>}
        {tooltip && (
            <span className="tooltip absolute mb-2 bottom-full left-1/2 transform -translate-x-1/2 text-white bg-black px-2 py-1 rounded-md">
                {tooltip}
            </span>
        )}
    </button>
)

const LikeDropdown = ({ likes }) => (
    <div className="dropdown dropdown-top dropdown-hover w-full">
        <button className="btn btn-ghost w-full flex justify-center items-center space-x-2">
            <ThumbsUp size={24} />
            <span>{likes}</span>
        </button>

        <ul className="dropdown-content menu p-2 shadow bg-base-300 rounded-box">
            <div className="flex gap-3">
                <ReactionButton
                    icon={
                        <Heart
                            size={24}
                            stroke={2}
                            color="#c81438"
                            weight="fill"
                        />
                    }
                    label="Love"
                />
                <ReactionButton
                    icon={
                        <ThumbsUp
                            size={24}
                            stroke={2}
                            color="#0673c6"
                            weight="fill"
                        />
                    }
                    label="Like"
                />
                <ReactionButton
                    icon={
                        <Smiley
                            size={24}
                            stroke={2}
                            color="#f6911e"
                            weight="fill"
                        />
                    }
                    label="Smile"
                />
                <ReactionButton
                    icon={
                        <Handshake
                            size={24}
                            stroke={2}
                            color="#3a9d23"
                            weight="fill"
                        />
                    }
                    label="Agree"
                />
                <ReactionButton
                    icon={
                        <Confetti
                            size={24}
                            stroke={2}
                            color="#ffd700"
                            weight="fill"
                        />
                    }
                    label="Celebrate"
                />
            </div>
        </ul>
    </div>
)

const ReactionButton = ({ icon, label }) => (
    <button className="btn btn-ghost btn-square hover:scale-125 transition-transform relative group">
        {icon}
        <span className="absolute mb-2 bottom-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black px-2 py-1 rounded-md">
            {label}
        </span>
    </button>
)

export default PostActions
