import React from 'react'
import SubmitButton from '@/components/ui/SubmitButton'
import { Users } from '@phosphor-icons/react'
import Link from 'next/link'
import OrganizationLogo from './OrganizationLogo'
import { cn, ConditionalRender } from '@/lib/utils'

const ClaimableOrganizationCard = ({ business, onClaim, isSubmitting }) => {
    return (
        <div className={cn('card w-full bg-base-100 shadow-md rounded-lg p-4')}>
            {/* Organization Logo and Name */}
            <div className="flex flex-col sm:flex-row items-center justify-between">
                {/* Left side: Avatar, Name, and Tagline */}
                <Link
                    href={`/business/${business.name}`}
                    className="flex items-start self-start">
                    <OrganizationLogo
                        LogoUrl={business?.logo}
                        alt={business?.display_name}
                        size="md"
                        isVerified={business?.is_verified}
                    />

                    <div className="ml-4 max-w-[200px] sm:max-w-[300px]">
                        <h2 className="card-title text-base font-semibold flex items-center">
                            {business?.display_name}
                        </h2>
                        <ConditionalRender condition={!!business?.tagline}>
                            <p className="text-sm text-gray-600 truncate">
                                {business?.tagline}
                            </p>
                        </ConditionalRender>

                        {/* Followers Information */}
                        <ConditionalRender
                            condition={business?.followed_by?.count > 0}>
                            <div className="flex items-start text-gray-600 mb-2">
                                <Users
                                    size={16}
                                    className="mr-2 flex-shrink-0"
                                    weight="fill"
                                />

                                <div className="text-xs lg:text-sm">
                                    <span>
                                        {
                                            business?.followed_by
                                                ?.abbreviate_count
                                        }{' '}
                                        followers
                                    </span>
                                    <span className="font-semibold"> • </span>
                                    <span>{business?.followed_by?.text}</span>
                                </div>
                            </div>
                        </ConditionalRender>
                    </div>
                </Link>

                {/* Right side: Claim Button */}
                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Claim this Business"
                    onClick={() => onClaim(business.name)}
                    type="button"
                    className="btn normal-case btn-primary self-end sm:self-auto w-auto"
                />
            </div>

            {/* Optional: Short Description */}
            <ConditionalRender condition={!!business?.short_description}>
                <div className="mt-4">
                    <p className="text-gray-600">
                        {business?.short_description}
                    </p>
                </div>
            </ConditionalRender>
        </div>
    )
}

export default ClaimableOrganizationCard
