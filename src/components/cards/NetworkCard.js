'use client'

import Image from '../Image'
import Avatar from '../ui/AvatarImage'
import FollowButton from '../ui/FollowButton'

export default function NetworkCard({ entity, entityType, onDismiss }) {
    const isOrganization = entityType === 'organizations'
    return (
        <div className="bg-base-100 w-auto p-4 relative rounded-md shadow-md">
            {/* Dismiss button */}
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className="absolute right-2 top-2 p-1 rounded-full hover:bg-gray-100">
                    ✕
                </button>
            )}

            {/* Profile section */}
            <div className="flex flex-col items-center">
                {isOrganization ? (
                    // Organization logo and name
                    <div className="relative w-20 h-20 mb-3">
                        <Image
                            data={entity?.logo}
                            alt={entity?.display_name}
                            className="rounded-lg object-cover"
                        />
                    </div>
                ) : (
                    // User avatar and name
                    <div className=" mb-3">
                        <Avatar
                            avatarUrl={entity?.avatar}
                            alt={entity?.name}
                            size="md"
                            isVerified={entity?.is_verified}
                        />
                    </div>
                )}

                <h3 className="font-semibold text-sm text-center">
                    {isOrganization ? entity?.display_name : entity?.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 text-center">
                    {isOrganization ? entity?.tagline : entity?.headline}
                </p>
            </div>

            {/* Mutual connections */}

            <div className=" mb-8 flex items-center justify-center">
                {entity?.followed_by.count > 0 && (
                    <span className="mt-4 text-xs text-gray-600 text-center">
                        {entity?.followed_by.text} followed
                    </span>
                )}
            </div>

            {/* Follow button */}
            <div className=" absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center">
                <FollowButton
                    entityType={isOrganization ? 'organizations' : 'users'}
                    entityName={entity?.username || entity?.name}
                    isFollowing={entity?.is_following}
                    buttonStyle="btn-wide max-w-[140px]"
                />
            </div>
        </div>
    )
}
