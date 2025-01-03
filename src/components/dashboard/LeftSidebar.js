'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SidebarSubmenu from './SidebarSubmenu'
import { X } from '@phosphor-icons/react'
import routes from './SidebarRoutes'
import Image from '../Image'
import Loading from '../ui/Loading'

function LeftSidebar({ organizationData }) {
    const url = usePathname()
    const pathname = url.split('/').pop()
    const ReneweLogo = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_LOGO}`
    const close = () => {
        document.getElementById('left-sidebar-drawer').click()
    }
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
                {routes.map((route, k) => (
                    <li key={k} className="mx-3">
                        {route.submenu ? (
                            <SidebarSubmenu {...route} />
                        ) : (
                            <Link
                                href={`/manage/${organizationData.name}/${route.path}`}
                                className={`${
                                    pathname === route.path
                                        ? 'font-semibold bg-base-200'
                                        : 'font-normal'
                                }`}
                                onClick={close}>
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
                ))}
            </ul>
        </div>
    )
}

export default LeftSidebar
