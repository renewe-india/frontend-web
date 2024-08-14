import React from 'react'
import { List } from '@phosphor-icons/react'
import Link from 'next/link'
import Image from '../Image'

function Header({ org }) {
    // Check if the manager_roles array includes 'administrator'
    const showManagersButton = org.manager_roles.includes('administrator')

    return (
        <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md">
            {/* Menu toggle for mobile view */}
            <div className="flex-1">
                <label
                    htmlFor="left-sidebar-drawer"
                    className="btn btn-primary drawer-button lg:hidden">
                    <List className="h-5 inline-block w-5" />
                </label>
            </div>

            {/* Profile icon, opening menu on click */}
            <div className="flex-none">
                <div className="dropdown dropdown-end ml-4">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                customClass={'mask mask-squircle w-10'}
                                data={org.logo}
                                alt={org.name}
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
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
            </div>
        </div>
    )
}

export default Header
