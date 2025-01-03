import Avatar from '../ui/AvatarImage'
import FollowButton from '../ui/FollowButton'
import { Users } from '@phosphor-icons/react/dist/ssr'

export default function UserCard({ user }) {
    return (
        <div className="card w-full bg-base-100 shadow-md rounded-lg p-2 sm:p-4">
            {/* Profile Image and Name */}
            <div className="flex items-center w-full justify-between gap-2">
                {/* Left side: Avatar, Name, and Headline */}
                <a href={`/users/${user?.username}`} className="flex-grow">
                    <div className="flex items-start">
                        <div className="flex-none">
                            <Avatar
                                avatarUrl={user?.avatar}
                                alt={user?.name}
                                size="md"
                                isVerified={user?.is_verified}
                            />
                        </div>

                        <div className="ml-2 sm:ml-4 max-w-[200px] sm:max-w-[350px]">
                            <h2 className="card-title text-sm sm:text-base font-semibold flex items-center">
                                <div className="flex items-start">
                                    {user?.name}
                                </div>
                            </h2>
                            {user?.headline && (
                                <p className="text-xs sm:text-sm text-gray-600 truncate">
                                    {user?.headline}
                                </p>
                            )}

                            {/* Followers Information */}
                            {user?.followed_by?.count > 0 && (
                                <div className="flex items-start text-gray-600 mb-2 ">
                                    <Users
                                        size={16}
                                        className="mr-2 flex-shrink-0"
                                        weight="fill"
                                    />
                                    <div className="text-xs lg:text-sm">
                                        <span>
                                            {user?.followed_by.abbreviate_count}{' '}
                                            followers
                                        </span>
                                        <span className="font-semibold ">
                                            {' '}
                                            •{' '}
                                        </span>
                                        <span>{user?.followed_by.text}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </a>

                {/* Right side: Follow button */}
                <div className="flex items-center flex-shrink-0">
                    <FollowButton
                        isFollowing={user?.is_following}
                        entityName={user?.username}
                        entityType={'users'}
                    />
                </div>
            </div>
        </div>
    )
}
