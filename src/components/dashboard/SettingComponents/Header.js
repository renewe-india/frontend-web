import React, { useContext } from 'react'
import { List, Moon, Sun } from '@phosphor-icons/react'
import { ThemeContext } from '@/context/ThemeContext'
import { useOrganization } from '@/context/OrganizationContext'
import Image from '@/components/Image'
import Link from 'next/link'

function Header() {
    const org = useOrganization()
    const { theme, toggleTheme } = useContext(ThemeContext)

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
                    htmlFor="left-sidebar-drawer-setting"
                    className="btn  drawer-button lg:hidden">
                    <List className="h-5 inline-block w-5" />
                </label>

                <h1 className="text-2xl font-semibold ml-2">Settings</h1>
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
                </label>
                {org && (
                    <div className="flex flex-row gap-2 items-center">
                        <Link href={`/manage/${org.name}/settings/profile`}>
                            <label className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image
                                        customClass={'mask mask-squircle w-10'}
                                        data={org.logo}
                                        alt={org.name}
                                    />
                                </div>
                            </label>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
