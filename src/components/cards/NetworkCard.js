'use client'

import Image from '../Image'
import FollowButton from '../ui/FollowButton'

export default function NetworkCard({ onDismiss }) {
    const user = {
        name: 'Melissa Gerhold DDS',
        username: 'cf601a7a-0ffd-43ee-81d7-4a7bef2ca8e1',
        headline: 'Global Branding Officer at Kessler, Kessler and Kessler',
        is_verified: false,
        is_following: false,
        followers: {
            count: 26,
            abbreviate_count: '26',
            text: 'Mr. Tremaine Parisian Jr., Jay Grant and 24 others',
        },
        avatar: {
            url: 'http://localhost:8000/images/placeholder/user.svg',
            srcset: null,
        },
    }

    return (
        <div className="bg-base-100 w-[220px] p-4 relative rounded-md shadow-md">
            {/* Dismiss button */}
            <button
                onClick={onDismiss}
                className="absolute right-2 top-2 p-1 rounded-full hover:bg-gray-100">
                ✕
            </button>

            {/* Profile section */}
            <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-3">
                    <Image
                        data={user?.avatar}
                        alt={user?.name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
                <h3 className="font-semibold text-sm text-center">
                    {user?.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 text-center">
                    {user?.headline}
                </p>
            </div>

            {/* Mutual connections */}
            {user?.followers && (
                <div className="mt-4 flex items-center justify-center">
                    <span className="text-xs text-gray-600 text-center">
                        {user?.followers.text}
                    </span>
                </div>
            )}

            {/* Follow button */}
            <div className="mt-4 flex justify-center">
                <FollowButton
                    entityType="users"
                    entityName={user?.username}
                    isFollowing={user?.is_following}
                    buttonSize="btn-wide w-full max-w-[180px]"
                />
            </div>
        </div>
    )
}
