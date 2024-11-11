import { Users, Plus, ShieldCheck, PaperPlaneTilt } from '@phosphor-icons/react'
import Image from '../Image'

export default function UserCard({ user }) {
    return (
        <div className="card w-full bg-base-100 shadow-xl border p-4">
            <a href={`/users/${user.username}`}>
                {/* Profile Image and Name */}
                <div className="flex items-center w-full">
                    <div className="avatar">
                        <div className="w-16 rounded-full">
                            <Image data={user?.avatar} alt={user?.name} />
                        </div>
                    </div>
                    <div className="ml-4 flex-1">
                        {/* Name and Headline */}
                        <h2 className="card-title text-base font-semibold flex items-center justify-between">
                            <div className="flex items-start">
                                {user.name} • <ShieldCheck size={20} />
                            </div>
                            <div className="lg:flex hidden gap-10">
                                <button className="btn btn-primary btn-sm text-white rounded-full flex items-center ml-2">
                                    <Plus size={20} />
                                    Follow
                                </button>
                                <button className="btn bg-base-100 normal-case btn-sm flex items-center gap-1">
                                    <PaperPlaneTilt size={18} weight="bold" />
                                    <span>Message</span>
                                </button>
                            </div>
                        </h2>
                        {user.headline && (
                            <p className="text-gray-600">{user.headline}</p>
                        )}
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
                                        {index <
                                            user.mutual_followers.length - 1 &&
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
                        <p className="text-gray-600">
                            {user.short_description}
                        </p>
                    </div>
                )}
            </a>

            {/* Follow and Message Buttons for Small Screens */}
            <div className="lg:hidden flex items-center justify-start mt-4">
                <button className="btn btn-primary btn-sm text-white rounded-full flex items-center ml-2">
                    <Plus size={20} />
                    Follow
                </button>
                <button className="btn bg-base-100 normal-case btn-sm flex items-center gap-1">
                    <PaperPlaneTilt size={18} weight="bold" />
                    <span>Message</span>
                </button>
            </div>
        </div>
    )
}
