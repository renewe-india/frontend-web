'use client'

import Link from 'next/link'
import { useState, useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import ProfileSection from '@/components/ProfileSection'
import {
    BellRinging,
    Briefcase,
    GlobeStand,
    MagnifyingGlass,
    Moon,
    Newspaper,
    Sun,
    Users,
    X,
} from '@phosphor-icons/react'
import MobileNavigation from '@/components/MobileNavigation'
import Notification from '@/components/Notification'
import Search from '@/components/Search'

const Navigation = () => {
    const { theme } = useContext(ThemeContext)
    const { toggleTheme } = useContext(ThemeContext)

    const handleToggle = e => {
        if (e.target.checked) {
            toggleTheme('dark')
        } else {
            toggleTheme('light')
        }
    }

    return (
        <>
            <div className="drawer absolute z-50">
                <input
                    id="sidebar"
                    x-ref="checkbox"
                    type="checkbox"
                    className="drawer-toggle"
                />

                <div className="drawer-side">
                    <label htmlFor="sidebar" className="drawer-overlay" />

                    <div className="card bg-base-100 rounded-lg p-5 min-h-screen rounded-none px-8 w-full md:max-w-xs shadow dark:shadow-white">
                        <div className="pb-5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold ">
                                        Manage
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="btn normal-case btn-ghost btn-sm"
                                        onClick={() => {
                                            const sidebarCheckbox = document.getElementById(
                                                'sidebar',
                                            )
                                            if (sidebarCheckbox) {
                                                sidebarCheckbox.checked = false
                                            }
                                        }}>
                                        <span className="block">
                                            <X size={24} stroke={2} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <ProfileSection />
                    </div>
                </div>
            </div>
            <Notification />
            <Search />
            <div
                id="navbar"
                style={{ transition: 'top 0.3s' }}
                className="fixed z-40 w-full text-sm px-5 shadow dark:shadow-white bg-inherit">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="flex items-center gap-2 md:gap-5">
                            <label
                                htmlFor="sidebar"
                                className="flex items-center cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <div className="avatar">
                                        <div className="w-7 rounded-full">
                                            <img
                                                src="/images/user.svg"
                                                alt="User Avatar"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <Link href="/" className="flex items-center mr-2">
                                <img
                                    src="/images/Renewe-logo.png"
                                    alt="RenewE Logo"
                                    className="h-5"
                                />
                            </Link>
                        </div>
                        {/* User Navigations */}
                        <div className="hidden lg:flex items-center gap-2 text-theme-dark dark:text-theme-light">
                            <ul className="menu rounded-md hidden md:flex md:flex-row items-center gap-2">
                                {/* Navigation items */}
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
                    {/* Toggle buttons */}
                    <div className="p-2 relative flex items-center gap-2 lg:gap-5">
                        {/* Search toggle */}
                        <label
                            htmlFor="search"
                            className="btn btn-sm btn-outline rounded-full btn-circle md:btn-wide">
                            <MagnifyingGlass size={24} stroke={2} />

                            <span className="hidden md:block">Search</span>
                        </label>
                        {/* Notifications toggle */}
                        <label
                            htmlFor="notifications"
                            className="btn btn-circle btn-sm relative btn-outline">
                            <BellRinging size={24} stroke={2} />

                            <div className="badge badge-error absolute -right-2 -top-2 badge-xs">
                                9+
                            </div>
                        </label>
                        {/* Dark Theme Toggle */}
                        <div className="hidden lg:block">
                            <label className="swap swap-rotate w-8 h-8 btn btn-circle btn-xs relative btn-outline">
                                <input
                                    type="checkbox"
                                    onChange={handleToggle}
                                    style={{ display: 'none' }}
                                    // show toggle image based on localstorage theme
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

            <MobileNavigation />
        </>
    )
}

export default Navigation
