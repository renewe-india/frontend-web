import React from 'react'
import Image from '@/components/Image'
import FollowButton from '@/components/ui/FollowButton'

function HeaderSection({ organization }) {
    return (
        <>
            <div className="relative w-full h-auto rounded-lg">
                <Image
                    data={organization.backdrop}
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute -bottom-16 md:-bottom-20 left-5">
                    <Image
                        data={organization.logo}
                        className="avatar w-24 sm:w-32 md:w-36 rounded-full border-4 border-white"
                    />
                </div>
            </div>
            <div className="mx-5 pb-2 mt-16 flex flex-col gap-2">
                <div className="font-bold text-base md:text-xl flex items-center gap-2">
                    {organization.display_name}{' '}
                    <FollowButton
                        entityType={'organizations'}
                        entityName={organization.name}
                        isFollowing={organization.is_following}
                    />
                </div>
                <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                    {organization.tagline}
                </div>
                <div className="text-gray-500 text-xs md:text-sm">
                    <time dateTime={organization.date_of_incorporation}>
                        {new Date(
                            organization.date_of_incorporation,
                        ).toLocaleString('default', {
                            month: 'long',
                            day: 'numeric',
                        })}
                        ,{' '}
                        {new Date(
                            organization.date_of_incorporation,
                        ).getFullYear()}
                    </time>
                </div>
            </div>
        </>
    )
}

export default HeaderSection
