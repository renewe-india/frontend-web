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
// import axios from '@/lib/axios'
import { cn } from '@/lib/utils'

const reactions = [
    {
        icon: (
            <ThumbsUp
                size={20}
                // color="#1E90FF"
                // weight="duotone"
                className="flex-shrink-0 hover:text-blue-500"
            />
        ),
        label: 'Like',
    },
    {
        icon: (
            <Confetti
                size={20}
                // color="#FFD700"
                // weight="duotone"
                className="flex-shrink-0 hover:text-yellow-500"
            />
        ),
        label: 'Celebrate',
    },
    {
        icon: (
            <Lightbulb
                size={20}
                // color="#FFA500"
                // weight="duotone"
                className="flex-shrink-0 hover:text-orange-500"
            />
        ),
        label: 'Inspiring',
    },
    {
        icon: (
            <HandsClapping
                size={20}
                // color="#2ECC71"
                // weight="duotone"
                className="flex-shrink-0 hover:text-green-500"
            />
        ),
        label: 'Appreciate',
    },
    {
        icon: (
            <HandHeart
                size={20}
                // color="#E74C3C"
                // weight="duotone"
                className="flex-shrink-0 hover:text-red-500"
            />
        ),
        label: 'Support',
    },
    {
        icon: (
            <Info
                size={20}
                // color="#8E44AD"
                // weight="duotone"
                // className="p-1 bg-purple-100 rounded-full flex-shrink-0"
                className="flex-shrink-0 hover:text-purple-500"
            />
        ),
        label: 'Informative',
    },
]

const ReactionSection = () => {
    const [selectedReaction, setSelectedReaction] = useState(null)

    const handleReaction = async reaction => {
        if (!reaction) return

        // if (selectedReaction?.label === reaction.label) {
        //     try {
        //         await axios.delete(`${url}/reactions`)
        //         setSelectedReaction(null)
        //     } catch (error) {
        //         // console.error('Error deleting reaction:', error)
        //     }
        // } else {
        //     try {
        //         await axios.post(`${url}/reactions`, {
        //             reaction: reaction.label.toLowerCase(),
        //         })
        setSelectedReaction(reaction)
        // } catch (error) {
        //     // console.error('Error updating reaction:', error)
        // }
        // }
    }

    return (
        <div className="dropdown dropdown-top dropdown-hove w-full">
            <button
                className="btn btn-ghost btn-sm w-full flex justify-center items-center space-x-1 px-0"
                onClick={() => handleReaction(selectedReaction)}>
                {selectedReaction ? (
                    selectedReaction.icon
                ) : (
                    <ThumbsUp size={20} color="currentColor" />
                )}
                <span className="hidden sm:block">
                    {selectedReaction ? selectedReaction.label : 'Like'}
                </span>
            </button>

            <ul className="dropdown-content menu shadow bg-base-300 rounded-lg p-3 ">
                <div className="flex gap-4 items-center justify-center">
                    {reactions.map((reaction, index) => (
                        <div
                            key={index}
                            className="tooltip tooltip-top"
                            data-tip={reaction.label}>
                            <button
                                className={cn(
                                    'p-1.5 hover:scale-125 transition-transform',
                                    {
                                        'scale-110':
                                            selectedReaction?.label ===
                                            reaction.label,
                                    },
                                )}
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
