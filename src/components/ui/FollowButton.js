import { Plus } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

function FollowButton({ AddNew }) {
    return (
        <button className="btn btn-outline btn-primary btn-sm">
            {AddNew && <Plus size={20} />}
            Follow
        </button>
    )
}

export default FollowButton
