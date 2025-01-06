import OrganizationLogo from '../organization/OrganizationLogo'
import FollowButton from '../ui/FollowButton'
import { Users } from '@phosphor-icons/react/dist/ssr'
import { cn, ConditionalRender } from '@/lib/utils'
import MainCard from '../ui/MainCard'

export default function OrganizationCard({ organization }) {
    return (
        <MainCard CardClassName={cn('bg-base-100 sm:p-4')}>
            {/* Organization Logo and Name Section */}
            <div
                className={cn('flex items-start w-full justify-between gap-2')}>
                {/* Left: Logo, Name, and Tagline */}
                <a
                    href={`/${organization?.type}/${organization?.name}`}
                    className="flex-grow">
                    <div className={cn('flex items-start gap-2 sm:gap-4')}>
                        <div className="flex-none">
                            <OrganizationLogo
                                LogoUrl={organization?.logo}
                                alt={organization?.display_name}
                                size="md"
                                isVerified={organization?.is_verified}
                            />
                        </div>
                        <div className="max-w-[200px] sm:max-w-[350px]">
                            <h2 className="card-title text-sm sm:text-base font-semibold">
                                {organization?.display_name}
                            </h2>
                            <ConditionalRender
                                condition={organization?.tagline}>
                                <p className="max-w-[100px] sm:sm:max-w-full text-xs sm:text-sm text-gray-600 truncate">
                                    {organization?.tagline}
                                </p>
                            </ConditionalRender>

                            {/* Followers Information */}
                            <ConditionalRender
                                condition={
                                    organization?.followed_by?.count > 0
                                }>
                                <div className="flex items-start text-gray-600 mb-2">
                                    <Users
                                        size={16}
                                        className="mr-2 flex-shrink-0"
                                        weight="fill"
                                    />
                                    <span className="text-xs lg:text-sm">
                                        <span>
                                            {
                                                organization?.followed_by
                                                    .abbreviate_count
                                            }{' '}
                                            followers
                                        </span>
                                        <span className="font-semibold ">
                                            {' '}
                                            •{' '}
                                        </span>
                                        <span>
                                            {organization?.followed_by.text}
                                        </span>
                                    </span>
                                </div>
                            </ConditionalRender>
                        </div>
                    </div>
                </a>

                {/* Right: Follow Button */}
                <div className={cn('flex flex-shrink-0 items-center')}>
                    <FollowButton
                        isFollowing={organization?.is_following}
                        entityName={organization?.name}
                        entityType={'organizations'}
                    />
                </div>
            </div>

            {/* Description Section */}
            <ConditionalRender condition={organization?.short_description}>
                <p className="mt-4 text-sm text-gray-600">
                    {organization?.short_description}
                </p>
            </ConditionalRender>

            {/* Follow Button for Small Screens */}
        </MainCard>
    )
}
