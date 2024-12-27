'use client'

import React from 'react'
import { DotsThreeVertical } from '@phosphor-icons/react'

const MoreOptions = () => {
    const copyPostLink = () => {
        const postLink = `${window.location.href}`

        navigator.clipboard
            .writeText(postLink)
            .then(() => {
                alert('Link copied to clipboard!')
            })
            .catch(() => {
                alert('Failed to copy the link. Please try again.')
            })
    }

    return (
        <div className="dropdown dropdown-end">
            <button
                className="btn btn-ghost btn-sm text-white"
                aria-label="More options">
                <DotsThreeVertical size={20} />
            </button>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <button onClick={copyPostLink} className="cursor-pointer">
                        Copy link
                    </button>
                </li>
                <li>
                    <a className="cursor-pointer">Report</a>
                </li>
            </ul>
        </div>
    )
}

export default MoreOptions
