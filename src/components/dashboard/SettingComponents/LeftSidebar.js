'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from '@phosphor-icons/react'
import routes from './SettingRoutes'
import Image from '@/components/Image'
import Loading from '@/components/ui/Loading'
import { useEffect, useState } from 'react'
import { useOrganization } from '@/context/OrganizationContext'

function LeftSidebar({ organizationData }) {
    const url = usePathname()
    const pathname = url.split('/').pop()
    const ReneweLogo = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_LOGO}`
    const org = useOrganization()
    const [showManagersButton, setShowManagersButton] = useState(null)
    const close = () => {
        document.getElementById('left-sidebar-drawer').click()
    }
    useEffect(() => {
        if (org) {
            setShowManagersButton(org.manager_roles.includes('administrator'))
        }
    }, [org])
    if (!organizationData) {
        return <Loading />
    }
    return (
        <div className="drawer-side lg:z-30 z-50">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay" />
            <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content">
                <button
                    className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
                    onClick={close}>
                    <X className="h-6 inline-block  w-6" />
                </button>

                <li className="mb-2 p-3 ">
                    <Link href="/">
                        <Image
                            src={ReneweLogo}
                            alt="RenewE Logo"
                            className="h-5 "
                        />
                    </Link>
                </li>
                {routes.map((route, k) =>
                    route.name === 'Managers' && !showManagersButton ? null : (
                        <li key={k} className="mx-3">
                            {route.name === 'Home' ? (
                                <Link
                                    href={`/manage/${organizationData.name}`}
                                    className={`${
                                        pathname === route.path
                                            ? 'font-semibold text-green-700 bg-base-200 text-lg'
                                            : 'font-normal text-lg'
                                    }`}>
                                    {route.icon} {route.name}
                                    {pathname === route.path && (
                                        <span
                                            className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-green-700"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Link>
                            ) : (
                                <Link
                                    href={`/manage/${organizationData.name}/settings/${route.path}`}
                                    className={`${
                                        pathname === route.path
                                            ? 'font-semibold text-green-700 bg-base-200 text-lg'
                                            : 'font-normal text-lg'
                                    }`}>
                                    {route.icon} {route.name}
                                    {pathname === route.path && (
                                        <span
                                            className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-green-700"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Link>
                            )}
                        </li>
                    ),
                )}
            </ul>
        </div>
    )
}

export default LeftSidebar
