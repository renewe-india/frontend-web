'use client'
import React, { useState } from 'react'
import {
    ThumbsUp,
    Confetti,
    Lightbulb,
    HandsClapping,
    HandHeart,
    Info,
} from '@phosphor-icons/react/dist/ssr'
import axios from '@/lib/axios'

const reactions = [
    {
        icon: (
            <ThumbsUp
                size={32}
                stroke={2}
                color="#1E90FF"
                weight="duotone"
                className="p-1 bg-blue-100 rounded-full flex-shrink-0"
            />
        ),
        label: 'Like',
    },
    {
        icon: (
            <Confetti
                size={32}
                stroke={2}
                color="#FFD700"
                weight="duotone"
                className="p-1 bg-yellow-100 rounded-full flex-shrink-0"
            />
        ),
        label: 'Celebrate',
    },
    {
        icon: (
            <Lightbulb
                size={32}
                stroke={2}
                color="#FFA500"
                weight="duotone"
                className="p-1 bg-orange-100 rounded-full flex-shrink-0"
            />
        ),
        label: 'Inspiring',
    },
    {
        icon: (
            <HandsClapping
                size={32}
                stroke={2}
                color="#2ECC71"
                weight="duotone"
                className="p-1 bg-green-100 rounded-full flex-shrink-0"
            />
        ),
        label: 'Appreciate',
    },
    {
        icon: (
            <HandHeart
                size={32}
                stroke={2}
                color="#E74C3C"
                weight="duotone"
                className="p-1 bg-red-100 rounded-full flex-shrink-0"
            />
        ),
        label: 'Support',
    },
    {
        icon: (
            <Info
                size={32}
                stroke={2}
                color="#8E44AD"
                weight="duotone"
                className="p-1 bg-purple-100 rounded-full flex-shrink-0"
            />
        ),
        label: 'Informative',
    },
]

const ReactionSection = ({ url }) => {
    const [selectedReaction, setSelectedReaction] = useState(null)

    const handleReaction = async reaction => {
        if (!reaction) return

        if (selectedReaction?.label === reaction.label) {
            try {
                await axios.delete(`${url}/reactions`)
                setSelectedReaction(null)
            } catch (error) {
                // console.error('Error deleting reaction:', error)
            }
        } else {
            try {
                await axios.post(`${url}/reactions`, {
                    reaction: reaction.label.toLowerCase(),
                })
                setSelectedReaction(reaction)
            } catch (error) {
                // console.error('Error updating reaction:', error)
            }
        }
    }

    return (
        <div className="dropdown dropdown-top dropdown-hover w-full">
            <button
                className="btn btn-ghost btn-sm w-full flex justify-center items-center space-x-1 px-0"
                onClick={() => handleReaction(selectedReaction)}>
                {selectedReaction ? (
                    selectedReaction.icon
                ) : (
                    <ThumbsUp size={20} stroke={2} color="currentColor" />
                )}
                <span className="hidden sm:block">
                    {selectedReaction ? selectedReaction.label : 'Like'}
                </span>
            </button>

            <ul className="dropdown-content menu shadow bg-base-300 rounded-lg p-2">
                <div className="flex gap-2 items-center justify-center">
                    {reactions.map((reaction, index) => (
                        <div
                            key={index}
                            className="tooltip tooltip-top"
                            data-tip={reaction.label}>
                            <button
                                className={`p-0 hover:scale-125 transition-transform ${
                                    selectedReaction?.label === reaction.label
                                        ? 'scale-110'
                                        : ''
                                }`}
                                onClick={() => handleReaction(reaction)}>
                                {reaction.icon}
                            </button>
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    )
}

export default ReactionSection
