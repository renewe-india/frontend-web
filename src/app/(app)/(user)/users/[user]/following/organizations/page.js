import { getPaginatedData } from '@/actions/get-paginated-data'
import MainCard from '@/components/ui/MainCard'
import { Briefcase } from '@phosphor-icons/react/dist/ssr'
import React from 'react'
import { cn, ConditionalRender } from '@/lib/utils'
import LoadMore from '../LoadMore'
import OrganizationCard from '@/components/cards/OrganizationCard'

const page = async ({ params }) => {
    const username = params.user
    const {
        data: organizationFollowing,
        meta: organizationFollowingMeta,
    } = await getPaginatedData(1, `users/${username}/following/organizations`)

    return (
        <div className="space-y-2">
            <MainCard CardClassName="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Briefcase
                            weight="duotone"
                            size={24}
                            color="#b85dcb"
                            className={cn(
                                'flex-shrink-0 bg-purple-100 rounded-full p-1',
                            )}
                        />
                        <div className="text-lg sm:text-2xl font-bold ">
                            {username} follows {organizationFollowingMeta.total}{' '}
                            organizations.{' '}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {organizationFollowing.map(org => (
                        <OrganizationCard key={org?.name} organization={org} />
                    ))}
                    <ConditionalRender
                        condition={organizationFollowing.last_page !== 1}>
                        <LoadMore
                            apiEndpoint={`users/${username}/following/organizations`}
                            type="organization"
                        />
                    </ConditionalRender>
                </div>
            </MainCard>
        </div>
    )
}

export default page
