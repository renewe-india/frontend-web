'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'

const Navigation = ({ user }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
    )

    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])

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
                    <label htmlFor="sidebar" className="drawer-overlay"></label>

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
                                            <svg
                                                className="inline w-5 h-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                data-slot="icon">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18 18 6M6 6l12 12"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Sidebar />
                    </div>
                </div>
            </div>
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
                            <Link
                                href="https://renewe.in"
                                className="flex items-center mr-2">
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
                                        href="https://renewe.in/network"
                                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap rounded-none bg-inherit">
                                        <svg
                                            className="inline w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                                        </svg>
                                        <span className="mary-hideable whitespace-nowrap">
                                            Network
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://renewe.in/news"
                                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap rounded-none bg-inherit">
                                        <svg
                                            className="inline w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"></path>
                                            <path d="M8 8l4 0"></path>
                                            <path d="M8 12l4 0"></path>
                                            <path d="M8 16l4 0"></path>
                                        </svg>
                                        <span className="mary-hideable whitespace-nowrap">
                                            News
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://renewe.in/events"
                                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap rounded-none bg-inherit">
                                        <svg
                                            className="inline w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M7 9a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                            <path d="M5.75 15a8.015 8.015 0 1 0 9.25 -13"></path>
                                            <path d="M11 17v4"></path>
                                            <path d="M7 21h8"></path>
                                        </svg>
                                        <span className="mary-hideable whitespace-nowrap">
                                            Events
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://renewe.in/jobs"
                                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap rounded-none bg-inherit">
                                        <svg
                                            className="inline w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                                            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
                                            <path d="M12 12l0 .01"></path>
                                            <path d="M3 13a20 20 0 0 0 18 0"></path>
                                        </svg>
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>

                            <span className="hidden md:block">Search</span>
                        </label>
                        {/* Notifications toggle */}
                        <label
                            htmlFor="notifications"
                            className="btn btn-circle btn-sm relative btn-outline">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>

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

                                <svg
                                    className="swap-on fill-current w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                                <svg
                                    className="swap-off fill-current w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation
