import React, { useContext, useState, useEffect } from 'react'
import { List, Moon, Sun } from '@phosphor-icons/react'
import Link from 'next/link'
import Image from '../Image'
import { ThemeContext } from '@/context/ThemeContext'
import { useOrganization } from '@/context/OrganizationContext'

function Header() {
    const ReneweLogo = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_LOGO}`
    const org = useOrganization()
    const [showManagersButton, setShowManagersButton] = useState(null)
    const { theme, toggleTheme } = useContext(ThemeContext)

    useEffect(() => {
        if (org) {
            setShowManagersButton(org.manager_roles.includes('administrator'))
        }
    }, [org])

    const handleToggle = e => {
        if (e.target.checked) {
            toggleTheme('dark')
        } else {
            toggleTheme('light')
        }
    }
    return (
        <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md">
            {/* Menu toggle for mobile view */}
            <div className="flex-1 gap-2">
                <label
                    htmlFor="left-sidebar-drawer"
                    className="btn  drawer-button lg:hidden">
                    <List className="h-5 inline-block w-5" />
                </label>
                <Link href="/">
                    <Image
                        src={ReneweLogo}
                        alt="RenewE Logo"
                        customClass={'h-5 lg:hidden block'}
                    />
                </Link>
            </div>

            {/* Profile icon, opening menu on click */}
            <div className="flex-none">
                <label className="swap swap-rotate w-8 h-8  btn-circle btn-xs relative">
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
                </label>{' '}
                {org && (
                    <div className="dropdown dropdown-end ml-4">
                        <div
                            tabIndex={0}
                            className="flex flex-row gap-2 items-center">
                            <label className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image
                                        customClass={'mask mask-squircle w-10'}
                                        data={org.logo}
                                        alt={org.name}
                                    />
                                </div>
                            </label>
                            <div className="hidden lg:block font-semibold text-base text-gray-600">
                                {org.display_name}
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <div className="block lg:hidden font-semibold text-base text-gray-600">
                                    {org.display_name}
                                    <div className="divider mt-0 mb-0" />
                                </div>
                            </li>

                            <li>
                                <Link href={`/manage/${org.name}/profile`}>
                                    Profile
                                </Link>
                            </li>
                            {showManagersButton && (
                                <li>
                                    <Link href={`/manage/${org.name}/managers`}>
                                        Managers
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link href={`/manage/${org.name}/contacts`}>
                                    Contacts
                                </Link>
                            </li>
                            <li>
                                <Link href={`/manage/${org.name}/settings`}>
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
