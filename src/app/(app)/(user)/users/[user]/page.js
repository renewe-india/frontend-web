import { getData } from '@/actions/getData'
import Image from '@/components/Image'
import FollowButton from '@/components/ui/FollowButton'
import MainCard from '@/components/ui/MainCard'
import UserInfo from './UserInfo'
import ErrorClose from './ErrorClose'
import { getPaginatedData } from '@/actions/get-paginated-data'
import NetworkCard from '@/components/cards/NetworkCard'
import {
    UserCircleCheck,
    User,
    ArrowRight,
    Briefcase,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import React from 'react'
import RelationshipListModal from '@/components/ui/RelationshipListModal'
import Avatar from '@/components/ui/AvatarImage'

export const metadata = {
    title: 'User Show',
}
export default async function UserShow({ params }) {
    const username = params.user
    const { data: userDetails, error } = await getData(`/users/${username}`)
    const {
        data: userFollowing,
        meta: userFollowingMeta,
    } = await getPaginatedData(1, `users/${username}/following/users`, 6)

    const {
        data: organizationFollowing,
        meta: organizationFollowingMeta,
    } = await getPaginatedData(
        '',
        `users/${username}/following/organizations`,
        6,
    )

    if (error?.status === 403) {
        return <ErrorClose error={error?.data?.message} />
    }

    return (
        <div className="space-y-2">
            <MainCard CardClassName={'flex flex-col gap-5'}>
                <div className="relative w-full h-auto rounded-lg">
                    <Image
                        data={userDetails?.backdrop}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute -bottom-16 md:-bottom-20 left-5">
                        <Avatar
                            avatarUrl={userDetails?.avatar}
                            alt={userDetails?.name}
                            size="xl"
                            isVerified={userDetails?.is_verified}
                        />
                    </div>
                </div>
                <div className="mx-5 sm:py-2 mt-14 sm:mt-16 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        {/* Name and Follow Button */}
                        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2">
                            {/* Name */}
                            <div>
                                <span className="font-bold text-xl md:text-2xl">
                                    {userDetails?.name}
                                </span>

                                <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                                    {userDetails?.headline}
                                </div>
                            </div>

                            {/* Follow and "People I follow" */}
                            <div className="flex justified-start sm:justify-end w-full sm:w-auto ml-auto gap-4">
                                <FollowButton
                                    entityType={'users'}
                                    entityName={userDetails?.username}
                                    isFollowing={userDetails?.is_following}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-left text-xs md:text-sm ">
                        <RelationshipListModal
                            count={userDetails?.followed_by}
                            entityName={userDetails?.username}
                            entityType="users"
                        />
                        <UserInfo user={userDetails} />
                    </div>
                </div>
            </MainCard>
            {userDetails?.headline && userDetails?.bio && (
                <MainCard>
                    <div className="mx-5 py-2">
                        <h2 className="card-title">About</h2>
                        <h2 className="text-base font-semibold my-4">
                            {userDetails?.headline}
                        </h2>
                        <p>{userDetails?.bio}</p>
                    </div>
                </MainCard>
            )}

            <MainCard CardClassName="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold flex gap-2 flex-shrink-0">
                        <UserCircleCheck
                            weight="duotone"
                            size={32}
                            color="#00a400"
                            className="flex-shrink-0 bg-green-100 rounded-full p-1"
                        />
                        Following
                    </span>
                    {userFollowingMeta.total + organizationFollowingMeta.total >
                        0 && (
                        <div className=" text-sm text-gray-500">
                            {userFollowingMeta.total +
                                organizationFollowingMeta.total}{' '}
                            Following{' '}
                        </div>
                    )}
                </div>
                {userFollowingMeta.total > 0 ? (
                    <>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <User
                                    weight="duotone"
                                    size={24}
                                    color="#2478ff"
                                    className="flex-shrink-0 bg-blue-100 rounded-full p-1"
                                />
                                <div className="text-base font-semibold">
                                    {userFollowingMeta.total} Peoples
                                </div>
                            </div>
                            <Link
                                href={`${username}/following/users`}
                                className="font-semibold text-base flex gap-2 items-center">
                                See all <ArrowRight size="16" weight="bold" />
                            </Link>{' '}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {userFollowing.map(user => (
                                <NetworkCard
                                    key={user?.username}
                                    entity={user}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-2 items-center">
                            <User
                                weight="duotone"
                                size={24}
                                color="#2478ff"
                                className="flex-shrink-0 bg-blue-100 rounded-full p-1"
                            />
                            <div className="text-lg font-semibold">
                                You do not follow any user.
                            </div>
                        </div>
                    </>
                )}{' '}
            </MainCard>
            <MainCard CardClassName="space-y-4">
                {organizationFollowingMeta.total > 0 ? (
                    <>
                        {' '}
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <Briefcase
                                    weight="duotone"
                                    size={24}
                                    color="#b85dcb"
                                    className="flex-shrink-0 bg-purple-100 rounded-full p-1"
                                />
                                <div className="text-base font-semibold">
                                    {organizationFollowingMeta.total}{' '}
                                    Organizations
                                </div>
                            </div>
                            <Link
                                href={`${username}/following/users`}
                                className="font-semibold text-sm flex gap-2 items-center">
                                See all <ArrowRight size="16" weight="bold" />
                            </Link>{' '}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {organizationFollowing.map(org => (
                                <NetworkCard
                                    key={org?.name}
                                    entity={org}
                                    entityType={org?.type}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-2 items-center">
                            <Briefcase
                                weight="duotone"
                                size={24}
                                color="#b85dcb"
                                className="flex-shrink-0 bg-purple-100 rounded-full p-1"
                            />
                            <div className="text-lg font-semibold">
                                You do not follow any Organization.
                            </div>
                        </div>
                    </>
                )}
            </MainCard>
        </div>
    )
}
