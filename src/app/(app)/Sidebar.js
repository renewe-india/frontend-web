import { React, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

function Sidebar() {
    const { logout } = useAuth()
    const [showBusinesses, setShowBusinesses] = useState(false)
    const [showAssociations, setShowAssociations] = useState(false)

    const toggleBusinesses = () => {
        setShowBusinesses(!showBusinesses)
        setShowAssociations(false) // Close associations when opening businesses
    }

    const toggleAssociations = () => {
        setShowAssociations(!showAssociations)
        setShowBusinesses(false) // Close businesses when opening associations
    }
    return (
        <div>
            <ul className="menu rounded-md">
                <hr className="my-3" />
                <li className="menu-title text-inherit uppercase">
                    <div className="flex items-center gap-2">
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
                                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path>
                        </svg>
                        Connect
                    </div>
                </li>

                <li>
                    <details
                        onClick={e => e.stopPropagation()}
                        open={showBusinesses}
                        className="mary-hideable">
                        <summary
                            onClick={e => toggleBusinesses()}
                            className="hover:text-inherit text-inherit">
                            <svg
                                className="inline w-5 h-5 inline-flex"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M3 7m0 2a2 2 0 1 1 4 0a2 2 0 1 1-4 0"></path>
                                <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
                                <path d="M12 12l0 .01"></path>
                                <path d="M3 13a20 20 0 0 0 18 0"></path>
                            </svg>
                            <span className="mary-hideable">My Businesses</span>
                        </summary>
                        <ul className="mary-hideable">
                            <li>
                                <Link
                                    href="https://renewe.in/businesses/create"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap">
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
                                        <path d="M12 5l0 14"></path>
                                        <path d="M5 12l14 0"></path>
                                    </svg>
                                    Create New Business
                                </Link>
                            </li>
                        </ul>
                    </details>
                </li>

                <li>
                    <details
                        onClick={e => e.stopPropagation()}
                        open={showAssociations}
                        className="mary-hideable">
                        <summary
                            onClick={e => toggleAssociations()}
                            className="hover:text-inherit text-inherit">
                            <svg
                                className="inline w-5 h-5 inline-flex"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path>
                                <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
                                <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path>
                                <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
                                <path d="M5 5a2 2 0 1 0 4 0"></path>
                                <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
                            </svg>
                            <span className="mary-hideable">
                                My Associations
                            </span>
                        </summary>
                        <ul className="mary-hideable">
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
                                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0"></path>
                                        <path d="M21 21l-6 -6"></path>
                                    </svg>
                                    Search Associations
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://renewe.in/coming-soon"
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap">
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
                                        <path d="M12 5l0 14"></path>
                                        <path d="M5 12l14 0"></path>
                                    </svg>
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
                                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path>
                        </svg>
                        Coming Soon
                    </div>
                </li>
                <li>
                    <Link
                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                        href="https://renewe.in/coming-soon">
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
                            <path d="M4.28 14h15.44a1 1 0 0 0 .97 -1.243l-1.5 -6a1 1 0 0 0 -.97 -.757h-12.44a1 1 0 0 0 -.97 .757l-1.5 6a1 1 0 0 0 .97 1.243z"></path>
                            <path d="M4 10h16"></path>
                            <path d="M10 6l-1 8"></path>
                            <path d="M14 6l1 8"></path>
                            <path d="M12 14v4"></path>
                            <path d="M7 18h10"></path>
                        </svg>
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
                            <path d="M3 17l6 -6l4 4l8 -8"></path>
                            <path d="M14 7l7 0l0 7"></path>
                        </svg>
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
                            <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                            <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path>
                            <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path>
                            <path d="M6 9l12 0"></path>
                            <path d="M6 12l3 0"></path>
                            <path d="M6 15l2 0"></path>
                        </svg>
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
                            <path d="M8 9h8"></path>
                            <path d="M8 13h6"></path>
                            <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z"></path>
                        </svg>
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
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                        </svg>
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
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5"></path>
                            <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                            <path d="M19.001 15.5v1.5"></path>
                            <path d="M19.001 21v1.5"></path>
                            <path d="M22.032 17.25l-1.299 .75"></path>
                            <path d="M17.27 20l-1.3 .75"></path>
                            <path d="M15.97 17.25l1.3 .75"></path>
                            <path d="M20.733 20l1.3 .75"></path>
                        </svg>
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
                            <svg
                                className="inline w-5 h-5 inline-flex"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                <path d="M12 17l0 .01"></path>
                                <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"></path>
                            </svg>
                            <span className="mary-hideable">
                                Help and Support
                            </span>
                        </summary>
                        <ul className="mary-hideable">
                            <li>
                                <Link
                                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap"
                                    href="https://renewe.in/coming-soon">
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
                                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                                        <path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25"></path>
                                        <path d="M12.5 15.5l2 2"></path>
                                        <path d="M15 13l2 2"></path>
                                    </svg>
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
                                        <path d="M15 5l0 2"></path>
                                        <path d="M15 11l0 2"></path>
                                        <path d="M15 17l0 2"></path>
                                        <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"></path>
                                    </svg>
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
                                        <path d="M15 21h-8a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h10a2 2 0 0 1 1.734 1.002"></path>
                                        <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
                                        <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
                                        <path d="M19 16v3"></path>
                                        <path d="M19 22v.01"></path>
                                    </svg>
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
                                        <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969"></path>
                                        <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554"></path>
                                        <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592"></path>
                                        <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305"></path>
                                        <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356"></path>
                                        <path d="M14 14l-4 -4"></path>
                                        <path d="M10 14l4 -4"></path>
                                    </svg>
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
                                        <path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385"></path>
                                        <path d="M6 9l4 4"></path>
                                        <path d="M13 10l-4 -4"></path>
                                        <path d="M3 21h7"></path>
                                        <path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z"></path>
                                    </svg>
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
                    onClick={logout}>
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
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M9 12h12l-3 -3"></path>
                        <path d="M18 15l3 -3"></path>
                    </svg>
                    Logout
                </div>
            </ul>
        </div>
    )
}

export default Sidebar
