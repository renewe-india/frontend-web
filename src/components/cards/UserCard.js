import Avatar from '../ui/AvatarImage'
import FollowButton from '../ui/FollowButton'
import { Users } from '@phosphor-icons/react/dist/ssr'

export default function UserCard({ user }) {
    return (
        <div className="card w-full bg-base-100 shadow-md rounded-lg border p-4">
            {/* Profile Image and Name */}
            <div className="flex items-center w-full justify-between">
                {/* Left side: Avatar, Name, and Headline */}
                <a href={`/users/${user?.username}`}>
                    <div className="flex items-center">
                        <Avatar
                            avatarUrl={user?.avatar}
                            alt={user?.name}
                            size="md"
                            isVerified={user?.is_verified}
                            additionalClasses="flex-shrink-0"
                        />

                        <div className="ml-4 max-w-[200px] sm:max-w-[350px]">
                            <h2 className="card-title text-base font-semibold flex items-center">
                                <div className="flex items-start">
                                    {user?.name}
                                </div>
                            </h2>
                            {user?.headline && (
                                <p className="text-sm text-gray-600 truncate">
                                    {user?.headline}
                                </p>
                            )}

                            {/* Followers Information */}
                            {user?.followers?.count > 0 && (
                                <div className="flex items-start text-gray-600 mb-2">
                                    <Users
                                        size={16}
                                        className="mr-2 flex-shrink-0"
                                        weight="fill"
                                    />
                                    <div className="text-xs lg:text-sm">
                                        <span>
                                            {user?.followers.abbreviate_count}{' '}
                                            followers
                                        </span>
                                        <span className="font-semibold">
                                            {' '}
                                            •{' '}
                                        </span>
                                        <span>{user?.followers.text}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </a>

                {/* Right side: Follow button */}
                <div className="hidden sm:flex items-center">
                    <FollowButton
                        isFollowing={user?.is_following}
                        entityName={user?.username}
                        entityType={'users'}
                    />
                </div>
            </div>

            {/* Follow and Message Buttons for Small Screens */}
            <div className="sm:hidden flex items-center justify-start gap-2 mt-4">
                <FollowButton
                    isFollowing={user?.is_following}
                    entityName={user?.username}
                    entityType={'users'}
                />
            </div>
        </div>
    )
}
