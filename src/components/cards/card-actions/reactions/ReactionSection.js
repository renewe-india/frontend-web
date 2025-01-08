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
        icon: <ThumbsUp size={20} />,
        label: 'Like',
        color: '#3b82f6', // Blue
    },
    {
        icon: <Confetti size={20} />,
        label: 'Celebrate',
        color: '#fbbf24', // Yellow
    },
    {
        icon: <Lightbulb size={20} />,
        label: 'Inspiring',
        color: '#fb923c', // Orange
    },
    {
        icon: <HandsClapping size={20} />,
        label: 'Appreciate',
        color: '#10b981', // Green
    },
    {
        icon: <HandHeart size={20} />,
        label: 'Support',
        color: '#ef4444', // Red
    },
    {
        icon: <Info size={20} />,
        label: 'Informative',
        color: '#a855f7', // Purple
    },
]

const ReactionSection = ({ url }) => {
    const [selectedReaction, setSelectedReaction] = useState(null)

    const handleReaction = async reaction => {
        if (!reaction) return

        if (selectedReaction?.label === reaction.label) {
            await axios.delete(`${url}/reactions`)
            setSelectedReaction(null)
        } else {
            await axios.post(`${url}/reactions`, {
                reaction: reaction.label.toLowerCase(),
            })
            setSelectedReaction(reaction)
        }
    }

    return (
        <div className="dropdown dropdown-top dropdown-hover w-full">
            <button
                className="btn btn-ghost btn-sm w-full flex justify-center items-center space-x-1 px-0"
                onClick={() => handleReaction(selectedReaction)}>
                {selectedReaction ? (
                    React.cloneElement(selectedReaction.icon, {
                        style: {
                            color: selectedReaction.color,
                        },
                    })
                ) : (
                    <ThumbsUp size={20} />
                )}
                <span className="hidden sm:block">
                    {selectedReaction ? selectedReaction.label : 'Like'}
                </span>
            </button>

            <ul className="dropdown-content menu shadow bg-base-300 rounded-lg p-3">
                <div className="flex gap-4 items-center justify-center">
                    {reactions.map((reaction, index) => (
                        <div
                            key={index}
                            className="tooltip tooltip-top"
                            data-tip={reaction.label}>
                            <button
                                className="p-1.5 hover:scale-150 transition-transform"
                                onClick={() => handleReaction(reaction)}
                                style={{
                                    color:
                                        selectedReaction?.label ===
                                        reaction.label
                                            ? reaction.color
                                            : 'inherit',
                                }}>
                                {React.cloneElement(reaction.icon, {
                                    style: {
                                        color:
                                            selectedReaction?.label ===
                                            reaction.label
                                                ? reaction.color
                                                : undefined,
                                    },
                                })}
                            </button>
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    )
}

export default ReactionSection
