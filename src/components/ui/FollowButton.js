'use client'
import { useUser } from '@/context/UserContext'
import axios from '@/lib/axios'
import { Check, Plus } from '@phosphor-icons/react'
import React, { useState } from 'react'

function FollowButton({ entityType, entityName, isFollowing, buttonSize }) {
    const { user } = useUser()
    const [follow, setFollow] = useState(isFollowing || false)
    const modalId = `unfollow_modal_${entityName}`

    const handleFollow = async () => {
        setFollow(true)
        await axios.post(`/follow/${entityType}/${entityName}`)
    }

    const handleUnFollow = async () => {
        document.getElementById(modalId).close()
        setFollow(false)
        await axios.post(`/unfollow/${entityType}/${entityName}`)
    }

    const showModal = () => {
        document.getElementById(modalId).showModal()
    }

    if (!user) {
        return (
            <button
                className={`z-10 btn btn-xs shadow-xl rounded-full btn-outline btn-neutral`}
                onClick={() => (window.location.href = '/login')}>
                <Plus size="12" weight="bold" /> Follow
            </button>
        )
    }
    if (user?.username === entityName) return null

    return (
        <>
            <button
                className={`z-10 btn btn-xs shadow-xl rounded-full btn-outline ${buttonSize}
                ${follow ? '' : 'btn-neutral'} `}
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
                    <p className="py-4">
                        Stop seeing posts from {entityName} on your feed.{' '}
                        {entityName} won’t be notified that you’ve unfollowed.
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
            </dialog>
        </>
    )
}

export default FollowButton
