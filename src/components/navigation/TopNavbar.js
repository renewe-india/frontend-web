'use client'
import React, { useState, useEffect, useContext, memo } from 'react'
import dynamic from 'next/dynamic'
import {
    BellRinging,
    Briefcase,
    Globe,
    List,
    MagnifyingGlass,
    Moon,
    Newspaper,
    Sun,
    Users,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { ThemeContext } from '@/context/ThemeContext'
import { motion } from 'framer-motion'
import { useUser } from '@/context/UserContext'
import { usePathname } from 'next/navigation'
import { cn, ConditionalRender } from '@/lib/utils'

const Image = dynamic(() => import('@/components/Image'), { ssr: false })
const AvatarSkeleton = () => (
    <div className="rounded-full avatar w-7 h-7 bg-gray-300 animate-pulse" />
)

const TopNavbar = memo(() => {
    const { user } = useUser()
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const ReneweLogo = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_LOGO}`
    const path = usePathname()
    const [currentPath, setCurrentPath] = useState('')

    useEffect(() => {
        setCurrentPath(path)
    }, [path])

    const handleToggle = e => {
        toggleTheme(e.target.checked ? 'dark' : 'light')
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!isMobile) return

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset
            setVisible(
                prevScrollPos > currentScrollPos || currentScrollPos < 10,
            )
            setPrevScrollPos(currentScrollPos)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos, isMobile])

    const getLinkClass = path => {
        return cn(
            'my-0.5 rounded-md whitespace-nowrap bg-inherit sm:px-2',
            currentPath && currentPath.includes(path)
                ? 'text-success'
                : 'text-gray-500 hover:bg-base-300',
        )
    }

    return (
        <motion.div
            id="navbar"
            initial={{ y: 0 }}
            animate={{ y: visible ? 0 : -60 }}
            transition={{ duration: 0.3 }}
            className="fixed z-40 w-full lg:h-14 text-sm px-2 lg:px-5 shadow dark:shadow-white bg-inherit">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex items-center gap-2 md:gap-5">
                        <label
                            htmlFor="sidebar"
                            className="flex items-center cursor-pointer">
                            <div className="flex items-center gap-2">
                                <ConditionalRender condition={!user}>
                                    <List className="h-5 inline-block w-5" />
                                </ConditionalRender>
                                <ConditionalRender
                                    condition={user && !user.avatar}>
                                    <AvatarSkeleton />
                                </ConditionalRender>
                                <ConditionalRender
                                    condition={user && user.avatar}>
                                    <Image
                                        data={
                                            user?.avatar || {
                                                url: '/images/user.svg',
                                            }
                                        }
                                        customClass="rounded-full avatar w-7"
                                    />
                                </ConditionalRender>
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
                        <ul className="menu px-0 rounded-md hidden md:flex md:flex-row items-center gap-2">
                            <li>
                                <Link
                                    href="/network"
                                    className={getLinkClass('/network')}>
                                    <Users size={24} stroke={2} weight="fill" />
                                    <span className="whitespace-nowrap">
                                        Network
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/news"
                                    className={getLinkClass('/news')}>
                                    <Newspaper
                                        size={24}
                                        stroke={2}
                                        weight="fill"
                                    />
                                    <span className="whitespace-nowrap">
                                        News
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/meet"
                                    className={getLinkClass('/meet')}>
                                    <Globe size={24} stroke={2} weight="fill" />
                                    <span className="whitespace-nowrap">
                                        Meet
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/jobs"
                                    className={getLinkClass('/jobs')}>
                                    <Briefcase
                                        size={24}
                                        stroke={2}
                                        weight="fill"
                                    />
                                    <span className="whitespace-nowrap">
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
                        className="btn btn-sm btn-circle relative text-gray-500 rounded-full sm:rounded-lg sm:btn-wide">
                        <MagnifyingGlass size={24} stroke={2} weight="fill" />
                        <span className="hidden sm:block">Search</span>
                    </label>
                    <ConditionalRender condition={user}>
                        <label
                            htmlFor="notifications"
                            className="btn btn-circle btn-sm relative text-gray-500">
                            <BellRinging size={24} stroke={2} weight="fill" />
                            <div className="badge badge-error absolute -right-2 -top-2 badge-xs">
                                9+
                            </div>
                        </label>
                    </ConditionalRender>
                    <div className="block">
                        <label className="swap swap-rotate w-8 h-8 btn btn-circle btn-xs relative text-gray-500 ">
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
                                weight="fill"
                            />
                            <Moon
                                className="swap-off fill-current w-5 h-5"
                                size={24}
                                stroke={2}
                                weight="fill"
                            />
                        </label>
                    </div>
                    <ConditionalRender condition={!user}>
                        <Link
                            href="/login"
                            className="btn btn-sm btn-primary btn-outline">
                            Login
                        </Link>
                    </ConditionalRender>
                </div>
            </div>
        </motion.div>
    )
})
TopNavbar.displayName = 'TopNavbar'
export default TopNavbar
