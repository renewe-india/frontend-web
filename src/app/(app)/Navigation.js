'use client'

import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import Sidebar from './Sidebar'
import { ThemeContext } from '@/context/ThemeContext'

const Navigation = ({ user }) => {
    const { theme } = useContext(ThemeContext)
    const { toggleTheme } = useContext(ThemeContext)
    const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false)

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
                                                    d="M6 18 18 6M6 6l12 12"
                                                />
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
            <div className="drawer absolute z-50 drawer-end">
                {/* Toggle visibility */}
                <input
                    id="notifications"
                    type="checkbox"
                    className="drawer-toggle"
                />

                <div className="drawer-side">
                    {/* Overlay effect , click outside */}
                    <label htmlFor="notifications" className="drawer-overlay" />

                    {/* Content */}
                    <div className="card bg-base-100 rounded-lg p-5 min-h-screen rounded-none px-8 w-full md:max-w-md shadow dark:shadow-white">
                        <div className="pb-5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold">
                                        Notifications
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const checkbox = document.getElementById(
                                                'notifications',
                                            )
                                            if (checkbox)
                                                checkbox.checked = false
                                        }}
                                        className="btn normal-case btn-ghost btn-sm">
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
                                                <path d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col gap-2">
                                {/* Item */}
                                <div className="p-2 shadow dark:shadow-white rounded-lg">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="avatar">
                                                <div className="w-7 rounded-full !w-10">
                                                    <img
                                                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                                        alt="profile"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold font-lg">
                                                    Grishma Khedekar
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    Liked a Post
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-500">
                                            17m ago
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type
                                        and scrambled it to make a
                                    </div>
                                </div>
                                {/* Item */}
                                {/* Item */}
                                <div className="p-2 shadow dark:shadow-white rounded-lg">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="avatar">
                                                <div className="w-7 rounded-full !w-10 !rounded">
                                                    <img
                                                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                                        alt="profile"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold font-lg">
                                                    Spinkraft Ventures Private
                                                    Limited
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    Share A Post
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-500">
                                            17m ago
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Lorem Ipsum is simply dummy text of
                                    </div>
                                </div>
                                {/* Item */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer absolute z-50 drawer-end">
                {/* Toggle visibility */}
                <input id="search" type="checkbox" className="drawer-toggle" />

                <div className="drawer-side">
                    {/* Overlay effect, click outside */}
                    <label htmlFor="search" className="drawer-overlay" />

                    {/* Content */}
                    <div className="card bg-base-100 rounded-lg p-5 min-h-screen rounded-none px-8 w-full md:max-w-md shadow dark:shadow-white">
                        <div className="pb-5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold">
                                        Search
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const checkbox = document.getElementById(
                                                'search',
                                            )
                                            if (checkbox)
                                                checkbox.checked = false
                                        }}
                                        className="btn normal-case btn-ghost btn-sm">
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
                                                <path d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="relative">
                                <input
                                    id="search_term"
                                    placeholder=" "
                                    className="input input-primary w-full peer"
                                    type="text"
                                    name="search_term"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <label className="flex gap-3">
                                    <input
                                        type="radio"
                                        name="search_model"
                                        value="search_users"
                                        className="radio"
                                        defaultChecked
                                    />
                                    <span>Users</span>
                                </label>
                                <label className="flex gap-3">
                                    <input
                                        type="radio"
                                        name="search_model"
                                        value="search_stock_items"
                                        className="radio"
                                    />
                                    <span>Product/Services</span>
                                </label>
                                <label className="flex gap-3">
                                    <input
                                        type="radio"
                                        name="search_model"
                                        value="search_businesses"
                                        className="radio"
                                    />
                                    <span>Businesses</span>
                                </label>
                                <label className="flex gap-3">
                                    <input
                                        type="radio"
                                        name="search_model"
                                        value="search_associations"
                                        className="radio"
                                    />
                                    <span>Associations</span>
                                </label>
                                <label className="flex gap-3">
                                    <input
                                        type="radio"
                                        name="search_model"
                                        value="search_news"
                                        className="radio"
                                    />
                                    <span>News</span>
                                </label>
                                <label className="flex gap-3">
                                    <input
                                        type="radio"
                                        name="search_model"
                                        value="search_events"
                                        className="radio"
                                    />
                                    <span>Events</span>
                                </label>
                            </div>

                            <button
                                type="button"
                                className="btn normal-case btn-primary">
                                <span className="block">
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
                                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                        <path d="M21 21l-6 -6" />
                                    </svg>
                                </span>
                                Search
                            </button>
                        </div>
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
                                        href="/network"
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
                                            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                                        </svg>
                                        <span className="mary-hideable whitespace-nowrap">
                                            Network
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/news"
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
                                            <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
                                            <path d="M8 8l4 0" />
                                            <path d="M8 12l4 0" />
                                            <path d="M8 16l4 0" />
                                        </svg>
                                        <span className="mary-hideable whitespace-nowrap">
                                            News
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/events"
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
                                            <path d="M7 9a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                            <path d="M5.75 15a8.015 8.015 0 1 0 9.25 -13" />
                                            <path d="M11 17v4" />
                                            <path d="M7 21h8" />
                                        </svg>
                                        <span className="mary-hideable whitespace-nowrap">
                                            Events
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/jobs"
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
                                            <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                                            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                                            <path d="M12 12l0 .01" />
                                            <path d="M3 13a20 20 0 0 0 18 0" />
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

            <div
                className={`mb-14 transform -bottom-14 left-0 fixed w-full overflow-auto ease-in-out transition-all duration-100 z-10 border-t ${
                    isBottomDrawerOpen ? '-translate-y-14' : 'translate-y-full'
                }`}>
                <div className="p-2 grid grid-cols-2 gap-2 bg-base-100 text-theme-dark dark:text-theme-light shadow dark:shadow-white">
                    <button
                        type="button"
                        className="btn normal-case btn-outline">
                        <span className="block">
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
                                <path d="M8 9h8" />
                                <path d="M8 13h6" />
                                <path d="M13 18l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6" />
                                <path d="M16 22l5 -5" />
                                <path d="M21 21.5v-4.5h-4.5" />
                            </svg>
                        </span>
                        Message
                    </button>
                    <button
                        type="button"
                        className="btn normal-case btn-outline">
                        <span className="block">
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
                                <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                                <path d="M7 8h10" />
                                <path d="M7 12h10" />
                                <path d="M7 16h10" />
                            </svg>
                        </span>
                        Article
                    </button>
                    <button
                        type="button"
                        className="btn normal-case btn-outline">
                        <span className="block">
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
                                <path d="M4 5h2" />
                                <path d="M5 4v2" />
                                <path d="M11.5 4l-.5 2" />
                                <path d="M18 5h2" />
                                <path d="M19 4v2" />
                                <path d="M15 9l-1 1" />
                                <path d="M18 13l2 -.5" />
                                <path d="M18 19h2" />
                                <path d="M19 18v2" />
                                <path d="M14 16.518l-6.518 -6.518l-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579 -4.39z" />
                            </svg>
                        </span>
                        Celebration
                    </button>
                    <button
                        type="button"
                        className="btn normal-case btn-outline">
                        <span className="block">
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
                                <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                                <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                            </svg>
                        </span>
                        Buy Request
                    </button>
                </div>
            </div>

            <div
                id="mobile-footer"
                style={{ transition: 'bottom 0.3s' }}
                className="fixed z-40 w-full text-xs grid grid-cols-5 bg-inherit lg:hidden items-center bottom-0 text-theme-dark dark:text-theme-light shadow dark:shadow-white">
                <Link
                    href="/network"
                    className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800">
                    <svg
                        className="inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                    Network
                </Link>
                <Link
                    href="/news"
                    className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800">
                    <svg
                        className="inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
                        <path d="M8 8l4 0" />
                        <path d="M8 12l4 0" />
                        <path d="M8 16l4 0" />
                    </svg>
                    News
                </Link>{' '}
                <button
                    onClick={() => setIsBottomDrawerOpen(!isBottomDrawerOpen)}
                    className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800">
                    <svg
                        className="inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                        <path d="M15 12h-6" />
                        <path d="M12 9v6" />
                    </svg>
                    Post
                </button>{' '}
                <Link
                    href="/events"
                    className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800">
                    <svg
                        className="inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M7 9a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M5.75 15a8.015 8.015 0 1 0 9.25 -13" />
                        <path d="M11 17v4" />
                        <path d="M7 21h8" />
                    </svg>
                    Events
                </Link>{' '}
                <Link
                    href="/jobs"
                    className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800">
                    <svg
                        className="inline h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                        <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                        <path d="M12 12l0 .01" />
                        <path d="M3 13a20 20 0 0 0 18 0" />
                    </svg>
                    Jobs{' '}
                </Link>
            </div>
        </>
    )
}

export default Navigation
