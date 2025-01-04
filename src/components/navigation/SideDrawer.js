'use client'
import { React, memo } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import OrganizationList from '@/components/organization/OrganizationListSidebar'
import { useUser } from '@/context/UserContext'
import { ConditionalRender } from '@/lib/utils'
import {
    AddressBook,
    PlugsConnected,
    BagSimple,
    UsersFour,
    Sparkle,
    Newspaper,
    Monitor,
    ChartLineUp,
    Certificate,
    ChatCenteredText,
    UserCircle,
    Question,
    Handshake,
    Ticket,
    Vault,
    XCircle,
    SignOut,
    X,
    UserSquare,
    LockKey,
    Password,
    UserFocus,
    ClockCounterClockwise,
    SealCheck,
    AddressBookTabs,
} from '@phosphor-icons/react/dist/ssr'

function SideDrawer() {
    const { logout } = useAuth()
    const { user } = useUser()
    const handleLogout = () => {
        logout()
    }
    const handleLinkClick = () => {
        const sidebarCheckbox = document.getElementById('sidebar')
        if (sidebarCheckbox) {
            sidebarCheckbox.checked = false
        }
    }
    return (
        <div className="drawer absolute z-50">
            <input id="sidebar" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side">
                <label htmlFor="sidebar" className="drawer-overlay" />

                <div className="card bg-base-100 rounded-lg p-5 min-h-screen rounded-none px-8 w-full md:max-w-xs shadow dark:shadow-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-2xl font-bold ">Manage</div>
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
                                    <X size={24} />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <ConditionalRender condition={user}>
                            <ul className="menu rounded-md">
                                <hr className="my-3" />
                                <li className="menu-title text-inherit uppercase">
                                    <div className="flex items-center gap-2">
                                        <PlugsConnected
                                            size={24}
                                            weight="thin"
                                        />
                                        Connect
                                    </div>
                                </li>

                                <li>
                                    <details>
                                        <summary className="hover:text-inherit text-inherit">
                                            <BagSimple
                                                size={24}
                                                weight="thin"
                                            />
                                            <span className="">
                                                My Businesses
                                            </span>
                                        </summary>
                                        <OrganizationList
                                            type="business"
                                            handleLinkClick={handleLinkClick}
                                        />
                                    </details>
                                </li>

                                <li>
                                    <details>
                                        <summary className="hover:text-inherit text-inherit">
                                            <UsersFour
                                                size={24}
                                                weight="thin"
                                            />
                                            <span className="mary-hideable">
                                                My Associations
                                            </span>
                                        </summary>
                                        <OrganizationList
                                            type="association"
                                            handleLinkClick={handleLinkClick}
                                        />
                                    </details>
                                </li>
                            </ul>
                        </ConditionalRender>
                        <ul className="menu rounded-md">
                            <hr className="my-3" />
                            <li className="menu-title text-inherit uppercase">
                                <div className="flex items-center gap-2">
                                    <Sparkle size={24} weight="thin" />
                                    Coming Soon
                                </div>
                            </li>
                            <li>
                                <Link
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                                    href="/coming-soon">
                                    <Newspaper size={24} weight="thin" />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Newsletters{' '}
                                        <span className="badge badge-ghost badge-sm !badge-warning">
                                            V5
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                    href="/coming-soon">
                                    <Monitor size={24} weight="thin" />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Projects{' '}
                                        <span className="badge badge-ghost badge-sm !badge-warning">
                                            V3
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                    href="/coming-soon">
                                    <ChartLineUp size={24} weight="thin" />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Invest{' '}
                                        <span className="badge badge-ghost badge-sm !badge-warning">
                                            V3
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                    href="/coming-soon">
                                    <Certificate size={24} weight="thin" />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Courses{' '}
                                        <span className="badge badge-ghost badge-sm !badge-warning">
                                            V5
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                    href="/coming-soon">
                                    <ChatCenteredText size={24} weight="thin" />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Forums{' '}
                                        <span className="badge badge-ghost badge-sm !badge-warning">
                                            V5
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu rounded-md">
                            <ConditionalRender condition={user}>
                                <>
                                    <hr className="my-3" />
                                    <li className="menu-title text-inherit uppercase">
                                        <div className="flex items-center gap-2">
                                            Settings
                                        </div>
                                    </li>
                                    <li>
                                        <details>
                                            <summary>
                                                <UserSquare
                                                    size={24}
                                                    weight="thin"
                                                />
                                                <span className="mary-hideable">
                                                    Account preferences
                                                </span>
                                            </summary>
                                            <ul className="mary-hideable">
                                                <li>
                                                    <Link
                                                        className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                        href="/profile"
                                                        onClick={() =>
                                                            handleLinkClick()
                                                        }>
                                                        <UserCircle
                                                            size={24}
                                                            weight="thin"
                                                        />
                                                        <span className="mary-hideable whitespace-nowrap">
                                                            Profile
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                        href="/verifications"
                                                        onClick={() =>
                                                            handleLinkClick()
                                                        }>
                                                        <SealCheck
                                                            size={24}
                                                            weight="thin"
                                                        />
                                                        <span className="mary-hideable whitespace-nowrap">
                                                            Verifications
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                        href="/contacts"
                                                        onClick={() =>
                                                            handleLinkClick()
                                                        }>
                                                        <AddressBookTabs
                                                            size={24}
                                                            weight="thin"
                                                        />
                                                        <span className="mary-hideable whitespace-nowrap">
                                                            Contacts
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                        href="/addresses"
                                                        onClick={() =>
                                                            handleLinkClick()
                                                        }>
                                                        <AddressBook
                                                            size={24}
                                                            weight="thin"
                                                        />
                                                        <span className="mary-hideable whitespace-nowrap">
                                                            Addresses
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li>
                                        <details>
                                            <summary>
                                                <LockKey
                                                    size={24}
                                                    weight="thin"
                                                />
                                                <span className="mary-hideable">
                                                    Security and Privacy
                                                </span>
                                            </summary>
                                            <ul className="mary-hideable">
                                                <li>
                                                    <Link
                                                        className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                        href="/password-update"
                                                        onClick={() =>
                                                            handleLinkClick()
                                                        }>
                                                        <Password
                                                            size={24}
                                                            weight="thin"
                                                        />
                                                        <span className="mary-hideable whitespace-nowrap">
                                                            Change Your password
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                        href="/username-update"
                                                        onClick={() =>
                                                            handleLinkClick()
                                                        }>
                                                        <UserFocus
                                                            size={24}
                                                            weight="thin"
                                                        />
                                                        <span className="mary-hideable whitespace-nowrap">
                                                            Change Your username
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                        href="/signed-in-history"
                                                        onClick={() =>
                                                            handleLinkClick()
                                                        }>
                                                        <ClockCounterClockwise
                                                            size={24}
                                                            weight="thin"
                                                        />
                                                        <span className="mary-hideable whitespace-nowrap">
                                                            Where you're signed
                                                            in
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                </>
                            </ConditionalRender>
                        </ul>
                        <ul className="menu rounded-md">
                            <hr className="my-3" />
                            <li className="menu-title text-inherit uppercase">
                                <div className="flex items-center gap-2">
                                    Support
                                </div>
                            </li>{' '}
                            <li>
                                <details>
                                    <summary>
                                        <Question size={24} weight="thin" />
                                        <span className="mary-hideable">
                                            Help and Support
                                        </span>
                                    </summary>
                                    <ul className="mary-hideable">
                                        <li>
                                            <Link
                                                className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                href="/coming-soon">
                                                <Handshake
                                                    size={24}
                                                    weight="thin"
                                                />
                                                <span className="mary-hideable whitespace-nowrap">
                                                    Help Center{' '}
                                                    <span className="badge badge-ghost badge-sm !badge-warning">
                                                        V3
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                href="/coming-soon">
                                                <Ticket
                                                    size={24}
                                                    weight="thin"
                                                />
                                                <span className="mary-hideable whitespace-nowrap">
                                                    Support Tickets{' '}
                                                    <span className="badge badge-ghost badge-sm !badge-warning">
                                                        V3
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                href="/coming-soon">
                                                <Vault
                                                    size={24}
                                                    weight="thin"
                                                />
                                                <span className="mary-hideable whitespace-nowrap">
                                                    Claims{' '}
                                                    <span className="badge badge-ghost badge-sm !badge-warning">
                                                        V3
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="my-0.5 hover-text-inherit rounded-md whitespace-nowrap"
                                                href="/coming-soon">
                                                <XCircle
                                                    size={24}
                                                    weight="thin"
                                                />
                                                <span className="mary-hideable whitespace-nowrap">
                                                    Report A Problem{' '}
                                                    <span className="badge badge-ghost badge-sm !badge-warning">
                                                        V4
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <hr className="my-3" />
                            <ConditionalRender condition={user}>
                                <div
                                    className="btn normal-case w-full btn-outline btn-xs"
                                    onClick={handleLogout}>
                                    <SignOut size={24} weight="thin" />
                                    Logout
                                </div>
                            </ConditionalRender>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(SideDrawer)
