'use client'
import { Plus, ShieldCheck } from '@phosphor-icons/react'
import React, { memo, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import AvatarSkeleton from '@/components/skeletons/AvatarSkeleton'
import BackdropSkeleton from '@/components/skeletons/BackdropSkeleton'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('@/components/Image'), { ssr: false })

const fetcher = url => axios.get(url).then(res => res.data.data)

const GuestAvatar = () => (
    <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center">
        <span className="text-white text-lg">G</span>
    </div>
)

const GuestBackdrop = () => (
    <Image src={'/images/backdrop.svg'} customClass="align-middle" />
)

const LeftSidebar = memo(() => {
    const { user } = useAuth({ middleware: 'auth' })
    const { data } = useSWR(user ? `/users/${user.username}` : null, fetcher)
    const guestAvatar = useMemo(() => <GuestAvatar />, [])
    const guestBackdrop = useMemo(() => <GuestBackdrop />, [])

    return (
        <div
            id="left-sidebar"
            className="hidden lg:flex flex-col gap-2 w-full col-span-1 lg:col-span-4 xl:col-span-3">
            <div className="relative flex flex-col rounded-[1rem] bg-base-200 rounded-lg p-5 text-center">
                <figure className="mb-5 mx-5">
                    <Suspense fallback={<BackdropSkeleton />}>
                        {user && data ? (
                            <Image
                                data={data.backdrop}
                                customClass="align-middle"
                            />
                        ) : user ? (
                            <BackdropSkeleton />
                        ) : (
                            guestBackdrop
                        )}
                    </Suspense>
                </figure>
                <div>
                    <div className="flex justify-center -mt-16">
                        <div className="flex items-center gap-2">
                            <Suspense fallback={<AvatarSkeleton />}>
                                {user && data ? (
                                    <Image
                                        data={data.avatar}
                                        customClass="w-7 !w-20 !rounded-full"
                                    />
                                ) : user ? (
                                    <AvatarSkeleton />
                                ) : (
                                    guestAvatar
                                )}
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
                    <div className="text-sm text-gray-500" />
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
