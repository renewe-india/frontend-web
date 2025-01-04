import React from 'react'
import Image from '@/components/Image'
import FollowButton from '@/components/ui/FollowButton'
import RelationshipListModal from '@/components/ui/RelationshipListModal'
import OrganizationLogo from '../OrganizationLogo'

function HeaderSection({ organization }) {
    return (
        <>
            <div className="relative w-full h-auto rounded-lg">
                <Image
                    data={organization?.backdrop}
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute -bottom-16 md:-bottom-20 left-5">
                    <OrganizationLogo
                        LogoUrl={organization?.logo}
                        alt={organization?.display_name}
                        size="xl"
                        isVerified={organization?.is_verified}
                    />
                </div>
            </div>
            <div className="mx-5 py-2 mt-14 sm:mt-16 flex flex-col gap-4">
                <div className="mt-2 flex flex-col items-left gap-2">
                    <div className="flex items-center gap-2">
                        <h2 className=" font-bold text-xl sm:text-2xl">
                            {organization?.display_name}{' '}
                        </h2>
                        <FollowButton
                            entityType={'organizations'}
                            entityName={organization?.name}
                            isFollowing={organization?.is_following}
                        />{' '}
                    </div>
                    <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                        {organization?.tagline}
                    </div>
                </div>

                <div className="mb-2 text-left text-xs md:text-sm ">
                    <RelationshipListModal
                        count={organization?.followed_by}
                        entityName={organization?.name}
                        entityType="organizations"
                    />
                </div>
            </div>
        </>
    )
}

export default HeaderSection
