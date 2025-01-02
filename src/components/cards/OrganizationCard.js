import Avatar from '../ui/AvatarImage'
import FollowButton from '../ui/FollowButton'
import { Users } from '@phosphor-icons/react'

export default function OrganizationCard({ organization }) {
    return (
        <div className="card w-full bg-base-100 shadow-md rounded-lg p-4">
            {/* Organization Logo and Name */}
            <div className="flex items-center w-full justify-between">
                {/* Left side: Avatar, Name, and Tagline */}
                <a href={`/${organization?.type}/${organization?.name}`}>
                    <div className="flex items-center">
                        <Avatar
                            avatarUrl={organization?.logo}
                            alt={organization?.display_name}
                            size="md"
                            isVerified={true}
                            additionalClasses="flex-shrink-0"
                        />

                        <div className="ml-4 max-w-[200px] sm:max-w-[350px]">
                            <h2 className="card-title text-base font-semibold flex items-center">
                                {organization?.display_name}
                            </h2>
                            {organization?.tagline && (
                                <p className="text-sm text-gray-600 truncate">
                                    {organization?.tagline}
                                </p>
                            )}

                            {/* Followers Information */}
                            {organization?.followed_by?.count > 0 && (
                                <div className="flex items-start text-gray-600 mb-2">
                                    <Users
                                        size={16}
                                        className="mr-2 flex-shrink-0"
                                        weight="fill"
                                    />

                                    <div className="text-xs lg:text-sm">
                                        <span>
                                            {
                                                organization?.followed_by
                                                    ?.abbreviate_count
                                            }{' '}
                                            followers
                                        </span>
                                        <span className="font-semibold">
                                            {' '}
                                            •{' '}
                                        </span>
                                        <span>
                                            {organization?.followed_by?.text}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </a>

                {/* Right side: Follow button */}
                <div className="hidden sm:flex items-center">
                    <FollowButton
                        isFollowing={organization?.is_following}
                        entityName={organization?.name}
                        entityType={'organizations'}
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="text-gray-600">
                    {organization?.short_description}
                </p>
            </div>
            {/* Follow and Message Buttons for Small Screens */}
            <div className="sm:hidden flex items-center justify-start gap-2 mt-4">
                <FollowButton
                    isFollowing={organization?.is_following}
                    entityName={organization?.name}
                    entityType={'organizations'}
                />
            </div>
        </div>
    )
}
