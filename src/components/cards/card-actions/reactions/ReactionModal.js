import { getData } from '@/actions/getData'
import Spinner from '@/components/ui/Spinner'
import { ConditionalRender } from '@/lib/utils'
import {
    ThumbsUp,
    Confetti,
    Lightbulb,
    HandsClapping,
    HandHeart,
    Info,
} from '@phosphor-icons/react/dist/ssr'
import React, { useState } from 'react'

const ReactionModal = ({ reactions, url }) => {
    const modalId = `reactions-modal-${reactions?.text}`
    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState({})
    const [selectedTab, setSelectedTab] = useState(0) // Track the selected tab (0 = "All" tab)

    const reactionTabs = [
        {
            icon: <ThumbsUp size={20} />,
            label: 'Like',
            key: 'like',
            color: '#3b82f6',
        },
        {
            icon: <Confetti size={20} />,
            label: 'Celebrate',
            key: 'celebrate',
            color: '#fbbf24',
        },
        {
            icon: <Lightbulb size={20} />,
            label: 'Inspiring',
            key: 'inspiring',
            color: '#fb923c',
        },
        {
            icon: <HandsClapping size={20} />,
            label: 'Appreciate',
            key: 'appreciate',
            color: '#10b981',
        },
        {
            icon: <HandHeart size={20} />,
            label: 'Support',
            key: 'support',
            color: '#ef4444',
        },
        {
            icon: <Info size={20} />,
            label: 'Informative',
            key: 'informative',
            color: '#a855f7',
        },
    ]

    const getReactionSummary = async () => {
        setLoading(true)
        const { data } = await getData(`${url}/reactions/summary`)
        setSummary(data) // Assuming data is a key-value object with counts for each reaction
        setLoading(false)
    }

    const openModal = () => {
        const modal = document.getElementById(modalId)
        modal.showModal()
        getReactionSummary()
    }

    const availableTabs = reactionTabs.filter(
        tab => summary.reactions && summary.reactions[tab.key] > 0,
    )

    return (
        <>
            <button
                onClick={openModal}
                className="link link-hover inline-flex gap-2 text-left">
                <ThumbsUp
                    size={16}
                    stroke={2}
                    color="#1E90FF"
                    className="flex-shrink-0"
                />
                <span className="block sm:hidden ">
                    {reactions?.abbreviate_count}
                </span>
                <span className="hidden sm:block truncate">
                    Liked by {reactions?.text}
                </span>
            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box pt-0 max-w-lg">
                    <ConditionalRender condition={loading}>
                        <div className="flex items-center justify-center mt-5">
                            <Spinner />
                        </div>
                    </ConditionalRender>
                    {/* Tabs Section */}
                    <ConditionalRender condition={summary && !loading}>
                        <div className="sticky top-0 bg-base-100 py-4 z-30">
                            <div
                                role="tablist"
                                className="tabs tabs-bordered flex-nowrap overflow-x-auto">
                                <button
                                    role="tab"
                                    className={`tab ${
                                        selectedTab === 0 ? 'tab-active' : ''
                                    }`}
                                    onClick={() => setSelectedTab(0)}>
                                    All
                                </button>
                                {availableTabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        role="tab"
                                        className={`tab space-x-1 ${
                                            selectedTab === index + 1
                                                ? 'tab-active'
                                                : ''
                                        }`}
                                        title={tab.label}
                                        onClick={() =>
                                            setSelectedTab(index + 1)
                                        }
                                        style={{ color: tab.color }}>
                                        {tab.icon}
                                        <span className="hidden sm:block text-gray-500">
                                            ({summary.reactions[tab.key]})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="p-4">
                            {/* Tab Content */}
                            {selectedTab === 0 ? (
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Overview
                                    </h3>
                                    <p>
                                        Summary of all reactions and insights.
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        {availableTabs.map((tab, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2">
                                                {tab.icon}
                                                <span>
                                                    {tab.label}:{' '}
                                                    {summary[tab.key]}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {availableTabs[selectedTab - 1]?.label}
                                    </h3>
                                    <p>
                                        Content for{' '}
                                        {availableTabs[selectedTab - 1]?.label}{' '}
                                        reactions.
                                    </p>
                                </div>
                            )}
                        </div>
                    </ConditionalRender>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default ReactionModal
