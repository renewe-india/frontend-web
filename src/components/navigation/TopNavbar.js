'use client'
import React, { useContext, memo } from 'react'
import dynamic from 'next/dynamic'
import {
    BellRinging,
    Briefcase,
    GlobeStand,
    List,
    MagnifyingGlass,
    Moon,
    Newspaper,
    Sun,
    Users,
} from '@phosphor-icons/react'
import axios from '@/lib/axios'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import useSWR from 'swr'
import { ThemeContext } from '@/context/ThemeContext'

const Image = dynamic(() => import('@/components/Image'), { ssr: false })

const fetcher = url => axios.get(url).then(res => res.data)
const AvatarSkeleton = () => (
    <div className="rounded-full avatar w-7 h-7 bg-gray-300 animate-pulse" />
)

const TopNavbar = memo(() => {
    const { user } = useAuth({ middleware: 'guest' })
    const { data: avatar } = useSWR(
        user ? `/media/users/${user.username}/avatar/first` : null,
        fetcher,
    )
    const { theme, toggleTheme } = useContext(ThemeContext)

    const ReneweLogo = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_LOGO}`

    const handleToggle = e => {
        if (e.target.checked) {
            toggleTheme('dark')
        } else {
            toggleTheme('light')
        }
    }

    return (
        <div
            id="navbar"
            style={{ transition: 'top 0.3s' }}
            className="fixed z-40 w-full lg:h-14 text-sm px-5 shadow dark:shadow-white bg-inherit">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex items-center gap-2 md:gap-5">
                        <label
                            htmlFor="sidebar"
                            className="flex items-center cursor-pointer">
                            <div className="flex items-center gap-2">
                                {!user ? (
                                    <List className="h-5 inline-block w-5" />
                                ) : !avatar ? (
                                    <AvatarSkeleton />
                                ) : (
                                    <Image
                                        data={avatar.data}
                                        customClass="rounded-full avatar w-7"
                                    />
                                )}
                            </div>
                        </label>
                        <Link href="/" className="flex items-center mr-2">
                            <Image
                                src={ReneweLogo}
                                alt="RenewE Logo"
                                className="h-5"
                            />
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center gap-2 text-theme-dark dark:text-theme-light">
                        <ul className="menu rounded-md hidden md:flex md:flex-row items-center ">
                            <li>
                                <Link
                                    href="/network"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap rounded-none bg-inherit">
                                    <Users size={24} stroke={2} />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Network
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/news"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap rounded-none bg-inherit">
                                    <Newspaper size={24} stroke={2} />
                                    <span className="mary-hideable whitespace-nowrap">
                                        News
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/events"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap rounded-none bg-inherit">
                                    <GlobeStand size={24} stroke={2} />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Events
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/jobs"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap rounded-none bg-inherit">
                                    <Briefcase size={24} stroke={2} />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Jobs
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="p-2 relative flex items-center gap-2 lg:gap-5">
                    <label
                        htmlFor="search"
                        className="btn btn-sm btn-outline rounded-full btn-circle md:btn-wide">
                        <MagnifyingGlass size={24} stroke={2} />
                        <span className="hidden md:block">Search</span>
                    </label>
                    {user && (
                        <label
                            htmlFor="notifications"
                            className="btn btn-circle btn-sm relative btn-outline">
                            <BellRinging size={24} stroke={2} />
                            <div className="badge badge-error absolute -right-2 -top-2 badge-xs">
                                9+
                            </div>
                        </label>
                    )}
                    <div className="block">
                        <label className="swap swap-rotate w-8 h-8 btn btn-circle btn-xs relative btn-outline">
                            <input
                                type="checkbox"
                                onChange={handleToggle}
                                style={{ display: 'none' }}
                                checked={theme === 'light' ? false : true}
                            />
                            <Sun
                                className="swap-on fill-current w-5 h-5"
                                size={24}
                                stroke={2}
                            />
                            <Moon
                                className="swap-off fill-current w-5 h-5"
                                size={24}
                                stroke={2}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
})
TopNavbar.displayName = 'TopNavbar'
export default TopNavbar
