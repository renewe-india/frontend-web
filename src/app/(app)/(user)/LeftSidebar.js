'use client'
import { Plus, ShieldCheck } from '@phosphor-icons/react'
import React, { memo, Suspense } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import AvatarSkeleton from '@/components/skeletons/AvatarSkeleton'
import BackdropSkeleton from '@/components/skeletons/BackdropSkeleton'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
import FollowButton from '@/components/ui/FollowButton'
const Image = dynamic(() => import('@/components/Image'), { ssr: false })

const fetcher = url => axios.get(url).then(res => res.data.data)

const LeftSidebar = memo(() => {
    const { user } = useAuth({ middleware: 'auth' })
    const { data, isLoading } = useSWR(
        user ? `/users/${user.username}` : null,
        fetcher,
    )
    if (!user || isLoading) {
        return (
            <div
                id="left-sidebar"
                className="hidden lg:flex flex-col gap-2 w-full col-span-1 lg:col-span-4 xl:col-span-3">
                <div className="relative flex flex-col gap-2 rounded-[1rem] bg-base-200 rounded-lg py-5 ">
                    <h2 className="text-2xl font-bold pb-5 px-5">
                        What's Going on
                    </h2>
                    <div>
                        <div className="bg-inherit hover:bg-base-300 w-full px-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm text-gray-500 font-medium mb-1">
                                        Trending in India
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        #RenewableEnergy
                                    </h3>
                                    <div className="text-sm text-blue-500 mt-1">
                                        Trending with{' '}
                                        <span className="font-semibold">
                                            #SwachShakti
                                        </span>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <button tabIndex={0} className="">
                                        ...
                                    </button>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
                                        <li>
                                            <button className="flex items-center gap-2">
                                                Not interested in this
                                            </button>
                                        </li>
                                        <li>
                                            <button className="flex items-center gap-2">
                                                This trend is harmful or shady
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="bg-inherit hover:bg-base-300 w-full px-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm text-gray-500 font-medium mb-1">
                                        Trending
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        #CleanAirMovement
                                    </h3>
                                    <div className="text-sm text-blue-500 mt-1">
                                        Trending with{' '}
                                        <span className="font-semibold">
                                            #EcoWarriors
                                        </span>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <button tabIndex={0} className="">
                                        ...
                                    </button>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
                                        <li>
                                            <button className="flex items-center gap-2">
                                                Not interested in this
                                            </button>
                                        </li>
                                        <li>
                                            <button className="flex items-center gap-2">
                                                This trend is harmful or shady
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="bg-inherit hover:bg-base-300 w-full px-5">
                            <div className="text-sm text-gray-500 font-medium mb-1">
                                Trending
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                #GreenEnergy
                            </h3>
                            <div className="text-sm mt-1">
                                1445{' '}
                                <span className="font-semibold">posts</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-col gap-2 rounded-[1rem] bg-base-200 rounded-lg p-5 ">
                    <h2 className="text-2xl font-bold pb-5 px-5">
                        Follow Suggestions
                    </h2>

                    <div className="space-y-4 w-full max-w-md mx-auto">
                        {/* Follow Suggestion 1 */}
                        <div className="flex items-center justify-between bg-base-100 p-4 rounded-lg shadow-md w-full">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img
                                            src="https://via.placeholder.com/150"
                                            alt="User Profile"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-base">
                                            Piyush Garg
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        @piyushgarg_dev
                                    </p>
                                </div>
                            </div>
                            <FollowButton />
                        </div>

                        {/* Follow Suggestion 2 */}
                        <div className="flex items-center justify-between bg-base-100 p-4 rounded-lg shadow-md w-full">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img
                                            src="https://via.placeholder.com/150"
                                            alt="User Profile"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-base">
                                            Aditi Verma
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        @aditiverma
                                    </p>
                                </div>
                            </div>
                            <FollowButton />
                        </div>

                        {/* Follow Suggestion 3 */}
                        <div className="flex items-center justify-between bg-base-100 p-4 rounded-lg shadow-md w-full">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img
                                            src="https://via.placeholder.com/150"
                                            alt="User Profile"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-base">
                                            Rahul Singh
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        @rahul_singh
                                    </p>
                                </div>
                            </div>
                            <FollowButton />
                        </div>

                        {/* Follow Suggestion 4 */}
                        <div className="flex items-center justify-between bg-base-100 p-4 rounded-lg shadow-md w-full">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img
                                            src="https://via.placeholder.com/150"
                                            alt="User Profile"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-base">
                                            Sneha Patel
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        @sneha_patel
                                    </p>
                                </div>
                            </div>
                            <FollowButton />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            id="left-sidebar"
            className="hidden lg:flex flex-col gap-2 w-full col-span-1 lg:col-span-4 xl:col-span-3">
            <div className="relative flex flex-col rounded-[1rem] bg-base-200 rounded-lg p-5 text-center">
                <figure className="mb-5 mx-5">
                    <Suspense fallback={<BackdropSkeleton />}>
                        <Image
                            data={
                                data?.backdrop || {
                                    url: '/images/backdrop.svg',
                                }
                            }
                            customClass="align-middle"
                        />
                    </Suspense>
                </figure>
                <div>
                    <div className="flex justify-center -mt-16">
                        <div className="flex items-center gap-2">
                            <Suspense fallback={<AvatarSkeleton />}>
                                <Image
                                    data={
                                        data?.avatar || {
                                            url: '/images/user.svg',
                                        }
                                    }
                                    customClass="w-7 !w-20 !rounded-full"
                                />
                            </Suspense>
                        </div>
                    </div>
                    {user && (
                        <div className="font-semibold flex items-center justify-center gap-2">
                            <div className="inline-flex items-center gap-1">
                                <ShieldCheck
                                    size={24}
                                    stroke={2}
                                    color="red"
                                    weight="bold"
                                />
                                <div className="text-negative-500">
                                    {user.name}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="text-sm text-gray-500">
                        <span>{user?.headline}</span>
                    </div>
                </div>
            </div>
            <div className="card bg-base-200 rounded-lg p-5">
                <div className="pb-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-2xl font-bold">
                                My Employments
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-5">
                        <Link
                            href="/profile#employments"
                            className="btn bg-base-300 normal-case btn-xs">
                            <Plus size={24} stroke={2} />
                            <span>Add Employment</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
})

LeftSidebar.displayName = 'LeftSidebar'
export default LeftSidebar
