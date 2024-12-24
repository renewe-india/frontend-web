'use client'

import { Plus, ShieldCheck } from '@phosphor-icons/react'
import React, { memo, Suspense } from 'react'
import Link from 'next/link'
import AvatarSkeleton from '@/components/skeletons/AvatarSkeleton'
import BackdropSkeleton from '@/components/skeletons/BackdropSkeleton'
import FollowButton from '@/components/ui/FollowButton'
import dynamic from 'next/dynamic'
import LeftSidebarSkeleton from '@/components/skeletons/LeftSidebarSkeleton'
import { useUser } from '@/context/UserContext'
const Image = dynamic(() => import('@/components/Image'))

const SkeletonWrapper = ({ children, fallback }) => (
    <Suspense fallback={fallback}>{children}</Suspense>
)

const LeftSidebar = memo(() => {
    const { user, isLoading } = useUser()

    if (isLoading) {
        return (
            <SidebarContainer>
                <LeftSidebarSkeleton />
            </SidebarContainer>
        )
    }

    if (!user) {
        return (
            <SidebarContainer>
                <TrendingSection />
                <FollowSuggestions />
            </SidebarContainer>
        )
    }

    return (
        <SidebarContainer>
            <UserProfile user={user} />
            <EmploymentSection />
        </SidebarContainer>
    )
})

const SidebarContainer = ({ children }) => (
    <div
        id="left-sidebar"
        className="sticky top-16 z-10 hidden lg:flex flex-col gap-2 w-full ">
        {children}
    </div>
)

const UserProfile = ({ user }) => (
    <Link
        href={`/users/${user?.username}`}
        className="relative flex flex-col rounded-[1rem] bg-base-200 text-center shadow-md">
        <div className="relative w-full h-auto rounded-lg">
            <SkeletonWrapper fallback={<BackdropSkeleton />}>
                <Image
                    data={user?.backdrop}
                    className="w-full h-full object-cover rounded-lg"
                />
            </SkeletonWrapper>
            <div className="flex justify-center -mt-10">
                <SkeletonWrapper fallback={<AvatarSkeleton />}>
                    <Image
                        data={user?.avatar}
                        className="avatar sm:w-20 rounded-full border-4 border-base-100"
                    />
                    {user?.is_verified && (
                        <ShieldCheck
                            size={28}
                            color="#00a400"
                            weight="fill"
                            className="absolute -bottom-2 right-1/2 transform translate-x-1/2 flex-shrink-0 bg-base-100 rounded-full p-1"
                        />
                    )}
                </SkeletonWrapper>
            </div>
        </div>
        <div className="py-2 mt-2 flex flex-col gap-2">
            <div className="mx-5 text-base font-semibold ">{user?.name}</div>
            <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                {user?.headline}
            </div>
        </div>
    </Link>
)
const EmploymentSection = () => (
    <div className="card bg-base-200 rounded-lg p-5 shadow-md">
        <div className="pb-5">
            <h2 className="text-2xl font-bold">My Employments</h2>
        </div>
        <Link
            href="/profile#employments"
            className="btn bg-base-300 normal-case btn-xs flex items-center gap-2">
            <Plus size={24} stroke={2} />
            <span>Add Employment</span>
        </Link>
    </div>
)

// Trending Topics Section
const TrendingSection = () => (
    <div className="relative flex flex-col gap-2 rounded-[1rem] bg-base-200 py-5 shadow-md">
        <h2 className="text-2xl font-bold pb-5 px-5">What's Going on</h2>
        {trendingTopics.map((topic, idx) => (
            <TrendingTopic key={idx} topic={topic} />
        ))}
    </div>
)

const TrendingTopic = ({ topic }) => (
    <div className="bg-inherit hover:bg-base-300 w-full px-5">
        <div className="flex justify-between items-start">
            <div>
                <div className="text-sm text-gray-500 font-medium mb-1">
                    {topic.category}
                </div>
                <h3 className="text-xl font-semibold">{topic.title}</h3>
                <div className="text-sm text-blue-500 mt-1">
                    Trending with{' '}
                    <span className="font-semibold">{topic.related}</span>
                </div>
            </div>
            <DropdownMenu />
        </div>
    </div>
)

// Dropdown Menu for Trends
const DropdownMenu = () => (
    <div className="dropdown dropdown-end">
        <button tabIndex={0}>...</button>
        <ul
            tabIndex={0}
            className="z-10 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
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
)

// Follow Suggestions Section
const FollowSuggestions = () => (
    <div className="relative flex flex-col gap-2 rounded-[1rem] bg-base-200 p-5">
        <h2 className="text-2xl font-bold pb-5">Follow Suggestions</h2>
        <div className="space-y-4 w-full max-w-md mx-auto">
            {followSuggestions.map((user, idx) => (
                <FollowSuggestion key={idx} user={user} />
            ))}
        </div>
    </div>
)

const FollowSuggestion = ({ user }) => (
    <div className="flex items-center justify-between bg-base-100 p-4 rounded-lg shadow-md w-full">
        <div className="flex items-center gap-3">
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src={user?.avatar} alt={user?.name} />
                </div>
            </div>
            <div>
                <span className="font-bold text-base">{user?.name}</span>
                <p className="text-gray-500 text-sm">{user?.username}</p>
            </div>
        </div>
        <FollowButton />
    </div>
)
const trendingTopics = [
    {
        category: 'Trending in India',
        title: '#RenewableEnergy',
        related: '#SwachShakti',
    },
    {
        category: 'Trending',
        title: '#CleanAirMovement',
        related: '#EcoWarriors',
    },
    { category: 'Trending', title: '#GreenEnergy', related: '1445 posts' },
]

const followSuggestions = [
    {
        name: 'Piyush Garg',
        username: '@piyushgarg_dev',
        avatar: 'https://via.placeholder.com/150',
    },
    {
        name: 'Aditi Verma',
        username: '@aditiverma',
        avatar: 'https://via.placeholder.com/150',
    },
    {
        name: 'Rahul Singh',
        username: '@rahul_singh',
        avatar: 'https://via.placeholder.com/150',
    },
    {
        name: 'Sneha Patel',
        username: '@sneha_patel',
        avatar: 'https://via.placeholder.com/150',
    },
]

LeftSidebar.displayName = 'LeftSidebar'
export default LeftSidebar
