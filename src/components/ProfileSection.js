import { React, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import {
    PlugsConnected,
    BagSimple,
    UsersFour,
    Plus,
    MagnifyingGlass,
    Sparkle,
    Newspaper,
    Monitor,
    ChartLineUp,
    Certificate,
    ChatCenteredText,
    UserCircle,
    UserGear,
    Question,
    Handshake,
    Ticket,
    Vault,
    XCircle,
    Gavel,
    SignOut,
} from '@phosphor-icons/react'

function ProfileSection() {
    const { logout, BusinessAvailableToClaim } = useAuth()
    const [errors, setErrors] = useState([])

    const handleLogout = () => {
        logout()
    }

    const handleCreateNewBusiness = () => {
        BusinessAvailableToClaim({ setErrors })
    }

    return (
        <div>
            <ul className="menu rounded-md">
                <hr className="my-3" />
                <li className="menu-title text-inherit uppercase">
                    <div className="flex items-center gap-2">
                        <PlugsConnected size={24} stroke={2} />
                        Connect
                    </div>
                </li>

                <li>
                    <details>
                        <summary className="hover:text-inherit text-inherit">
                            <BagSimple size={24} stroke={2} />
                            <span className="">My Businesses</span>
                        </summary>
                        <ul className="menu dropdown-content z-[1] bg-base-100">
                            <li>
                                <div className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap">
                                    <Plus size={24} stroke={2} />
                                    <button onClick={handleCreateNewBusiness}>
                                        Create New Business
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </details>
                </li>

                <li>
                    <details>
                        <summary className="hover:text-inherit text-inherit">
                            <UsersFour size={24} stroke={2} />
                            <span className="mary-hideable">
                                My Associations
                            </span>
                        </summary>
                        <ul className="menu dropdown-content z-[1] bg-base-100">
                            <li>
                                <Link
                                    href="#"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap">
                                    <img
                                        src="/images/user.svg"
                                        className="h-5 w-5 overflow-hidden rounded"
                                        alt="Company Logo"
                                    />
                                    <span>MASMA</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap">
                                    <img
                                        src="/images/user.svg"
                                        className="h-5 w-5 overflow-hidden rounded"
                                        alt="Company Logo"
                                    />
                                    <span>SOLICE</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://renewe.in/coming-soon"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap">
                                    <MagnifyingGlass size={24} stroke={2} />
                                    Search Associations
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/associations/create"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap">
                                    <Plus size={24} stroke={2} />
                                    Create New Association
                                </Link>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
            <ul className="menu rounded-md">
                <hr className="my-3" />
                <li className="menu-title text-inherit uppercase">
                    <div className="flex items-center gap-2">
                        <Sparkle size={24} stroke={2} />
                        Coming Soon
                    </div>
                </li>
                <li>
                    <Link
                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                        href="https://renewe.in/coming-soon">
                        <Newspaper size={24} stroke={2} />
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
                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                        href="https://renewe.in/coming-soon">
                        <Monitor size={24} stroke={2} />
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
                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                        href="https://renewe.in/coming-soon">
                        <ChartLineUp size={24} stroke={2} />
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
                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                        href="https://renewe.in/coming-soon">
                        <Certificate size={24} stroke={2} />
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
                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                        href="https://renewe.in/coming-soon">
                        <ChatCenteredText size={24} stroke={2} />
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
                <hr className="my-3" />
                <li className="menu-title text-inherit uppercase">
                    <div className="flex items-center gap-2">Settings</div>
                </li>
                <li>
                    <Link
                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                        href="https://renewe.in/coming-soon">
                        <UserCircle size={24} stroke={2} />
                        <span className="mary-hideable whitespace-nowrap">
                            Profile{' '}
                            <span className="badge badge-ghost badge-sm !badge-warning">
                                Coming Soon
                            </span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                        href="https://renewe.in/coming-soon">
                        <UserGear size={24} stroke={2} />
                        <span className="mary-hideable whitespace-nowrap">
                            Preferences{' '}
                            <span className="badge badge-ghost badge-sm !badge-warning">
                                V3
                            </span>
                        </span>
                    </Link>
                </li>
                <li>
                    <details>
                        <summary>
                            <Question size={24} stroke={2} />
                            <span className="mary-hideable">
                                Help and Support
                            </span>
                        </summary>
                        <ul className="mary-hideable">
                            <li>
                                <Link
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                                    href="https://renewe.in/coming-soon">
                                    <Handshake size={24} stroke={2} />
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
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                                    href="https://renewe.in/coming-soon">
                                    <Ticket size={24} stroke={2} />
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
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                                    href="https://renewe.in/coming-soon">
                                    <Vault size={24} stroke={2} />
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
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                                    href="https://renewe.in/coming-soon">
                                    <XCircle size={24} stroke={2} />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Report A Problem{' '}
                                        <span className="badge badge-ghost badge-sm !badge-warning">
                                            V4
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                                    href="https://renewe.in/coming-soon">
                                    <Gavel size={24} stroke={2} />
                                    <span className="mary-hideable whitespace-nowrap">
                                        Terms and Policies{' '}
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

                <div
                    className="btn normal-case w-full btn-outline btn-xs"
                    onClick={handleLogout}>
                    <SignOut size={24} stroke={2} />
                    Logout
                </div>
            </ul>
        </div>
    )
}

export default ProfileSection
