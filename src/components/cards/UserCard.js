import Image from '../Image'
import FollowButton from '../ui/FollowButton'
import { Users, ShieldCheck } from '@phosphor-icons/react/dist/ssr'

export default function UserCard({ user }) {
    return (
        <div className="card w-full bg-base-100 shadow-md border p-4">
            {/* Profile Image and Name */}
            <div className="flex items-center w-full justify-between">
                {/* Left side: Avatar, Name, and Headline */}
                <a href={`/users/${user.username}`}>
                    <div className="flex items-center">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <Image data={user?.avatar} alt={user?.name} />
                            </div>
                        </div>
                        <div className="ml-4">
                            <h2 className="card-title text-base font-semibold flex items-center">
                                <div className="flex items-start">
                                    {user.name} •{' '}
                                    <ShieldCheck size={20} weight="duotone" />
                                </div>
                            </h2>
                            {user.headline && (
                                <p className="text-gray-600">{user.headline}</p>
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

            {/* Followers Information */}
            <div className="mt-4">
                <div className="flex items-start text-gray-600 mb-2">
                    <Users size={20} className="mr-2" />
                    <div className="text-xs lg:text-sm">
                        <span>{user.followers || 0} followers</span>
                        <span className="font-semibold"> • </span>
                        {user.mutual_followers &&
                        user.mutual_followers.length > 0 ? (
                            user.mutual_followers.map((follower, index) => (
                                <span key={index}>
                                    {follower}
                                    {index < user.mutual_followers.length - 1 &&
                                        ', '}
                                </span>
                            ))
                        ) : (
                            <span>
                                Alice Smith, Bob Johnson, Charlie Brown and
                                other mutual followers
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Short Description */}
            {user.short_description && (
                <div className="mt-4">
                    <p className="text-gray-600">{user.short_description}</p>
                </div>
            )}

            {/* Follow and Message Buttons for Small Screens */}
            <div className="sm:hidden flex items-center justify-start gap-2 mt-4">
                <FollowButton
                    isFollowing={user.is_following}
                    entityName={user.username}
                    entityType={'users'}
                />
            </div>
        </div>
    )
}
