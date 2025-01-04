'use client'
import { useUser } from '@/context/UserContext'
import axios from '@/lib/axios'
import { Check, Plus } from '@phosphor-icons/react'
import React, { useState } from 'react'
import { cn, ConditionalRender } from '@/lib/utils'

function FollowButton({ entityType, entityName, isFollowing, buttonStyle }) {
    const { user } = useUser()
    const [follow, setFollow] = useState(isFollowing || false)
    const modalId = `unfollow_modal_${entityName}`

    const handleFollow = async () => {
        setFollow(true)
        await axios.post(`/${entityType}/${entityName}/follow`)
    }

    const handleUnFollow = async () => {
        document.getElementById(modalId).close()
        setFollow(false)
        await axios.post(`/${entityType}/${entityName}/unfollow`)
    }

    const showModal = () => {
        document.getElementById(modalId).showModal()
    }

    return (
        <>
            <ConditionalRender condition={!user}>
                <button
                    className={cn(
                        'z-10 btn btn-xs shadow-xl rounded-full btn-outline btn-neutral',
                        buttonStyle,
                    )}
                    onClick={() => (window.location.href = '/login')}>
                    <Plus size="12" weight="bold" /> Follow
                </button>
            </ConditionalRender>
            <ConditionalRender condition={user?.username !== entityName}>
                <button
                    className={cn(
                        'z-10 btn btn-xs shadow-xl rounded-full btn-outline',
                        buttonStyle,
                        { 'btn-neutral': !follow },
                    )}
                    onClick={follow ? showModal : handleFollow}>
                    {follow ? (
                        <>
                            <Check size="12" weight="bold" /> Following
                        </>
                    ) : (
                        <>
                            <Plus size="12" weight="bold" /> Follow
                        </>
                    )}
                </button>
                {/* Modal */}
                <dialog id={modalId} className="modal">
                    <div className="modal-box w-11/12 max-w-md">
                        <h3 className="font-bold text-lg">
                            Unfollow {entityName}?
                        </h3>
                        <p className="py-4 break-all">
                            Stop seeing posts from {entityName} on your feed.{' '}
                            {entityName} won’t be notified that you’ve
                            unfollowed.
                        </p>
                        <div className="modal-action">
                            {/* Cancel button */}
                            <button
                                className="btn btn-outline"
                                onClick={() =>
                                    document.getElementById(modalId).close()
                                }>
                                Cancel
                            </button>
                            {/* Unfollow button */}
                            <button
                                className="btn btn-neutral"
                                onClick={handleUnFollow}>
                                Unfollow
                            </button>
                        </div>
                    </div>
                </dialog>{' '}
            </ConditionalRender>
        </>
    )
}

export default FollowButton
