import { Plus, ShieldCheck } from '@phosphor-icons/react'
import React, { lazy, memo, Suspense } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import AvatarSkeleton from '@/components/skeletons/AvatarSkeleton'
import BackdropSkeleton from '@/components/skeletons/BackdropSkeleton'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'

const Image = lazy(() => import('@/components/Image'))

const fetcher = url => axios.get(url).then(res => res.data.data)

const LeftSidebar = memo(() => {
    const { user } = useAuth({ middleware: 'auth' })
    const { data, error } = useSWR(
        user ? `/api/users/${user.username}` : null,
        fetcher,
    )
    const router = useRouter()
    if (error) {
        router.push('/login')
    }

    return (
        <div
            id="left-sidebar"
            className="hidden lg:flex flex-col gap-2 w-full col-span-1 lg:col-span-4 xl:col-span-3">
            <div className="relative flex flex-col rounded-[1rem] bg-base-200 rounded-lg p-5 text-center">
                <figure className="mb-5 mx-5">
                    <Suspense fallback={<BackdropSkeleton />}>
                        {data ? (
                            <Image
                                data={data.backdrop}
                                customClass="align-middle"
                            />
                        ) : (
                            <BackdropSkeleton />
                        )}
                    </Suspense>
                </figure>
                <div>
                    <div className="flex justify-center -mt-16">
                        <div className="flex items-center gap-2">
                            <Suspense fallback={<AvatarSkeleton />}>
                                {data ? (
                                    <Image
                                        data={data.avatar}
                                        customClass="w-7 !w-20 !rounded-full"
                                    />
                                ) : (
                                    <AvatarSkeleton />
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
