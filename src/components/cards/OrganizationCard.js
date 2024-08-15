import Image from 'next/image'
import { Users, Plus, ShieldCheck } from '@phosphor-icons/react'

export default function OrganizationCard({ organization }) {
    return (
        <a
            href={`/${organization.type}/${organization.name}`}
            className="card w-full bg-base-100 shadow-xl border p-4 flex flex-col items-start">
            {/* organization Logo and Name */}
            <div className="flex items-center w-full">
                <div className="avatar">
                    <div className="w-16 rounded-full">
                        <Image
                            src={organization.logo.url}
                            alt={organization.display_name}
                            width={60}
                            height={60}
                        />
                    </div>
                </div>
                <div className="ml-4 flex-1">
                    {/* Name and Tagline */}
                    <h2 className="card-title text-base font-semibold flex items-center justify-between">
                        <div className="flex items-center">
                            {organization.display_name} •{' '}
                            <ShieldCheck size={20} />
                        </div>
                        <button className="btn btn-outline btn-primary btn-sm rounded-full flex items-center ml-2">
                            <Plus size={20} />
                            Follow
                        </button>
                    </h2>
                    <p className="text-gray-600">{organization.tagline}</p>
                </div>
            </div>

            {/* Followers Information */}
            <div className="mt-4">
                <div className="flex items-center text-gray-600 mb-2">
                    <Users size={20} className="mr-2" />{' '}
                    <div className="text-xs lg:text-sm">
                        <span>{organization.followers || 0} followers</span>
                        <span className="font-semibold"> • </span>
                        {organization.mutual_followers &&
                        organization.mutual_followers.length > 0 ? (
                            organization.mutual_followers.map(
                                (follower, index) => (
                                    <span key={index}>
                                        {follower}
                                        {index <
                                            organization.mutual_followers
                                                .length -
                                                1 && ', '}
                                    </span>
                                ),
                            )
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
            <div className="mt-4">
                <p className="text-gray-600">
                    {organization.short_description}
                </p>
            </div>
        </a>
    )
}
