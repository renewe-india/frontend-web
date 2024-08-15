import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SidebarSubmenu from './SidebarSubmenu'
import { X } from '@phosphor-icons/react'
import routes from './SidebarRoutes'
import Image from '../Image'
import Loading from '../Loading'

function LeftSidebar({ organizationData }) {
    const pathname = usePathname()

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

                <li className="mb-2 font-semibold text-xl">
                    <Link href="/">
                        <Image
                            customClass={'mask mask-squircle w-10'}
                            data={organizationData.logo}
                            alt={organizationData.name}
                        />
                        {organizationData.display_name}
                    </Link>
                </li>
                {routes.map((route, k) => (
                    <li key={k}>
                        {route.submenu ? (
                            <SidebarSubmenu {...route} />
                        ) : (
                            <Link
                                href={`/manage/${organizationData.name}/${route.path}`}
                                className={`${
                                    pathname === route.path
                                        ? 'font-semibold bg-base-200'
                                        : 'font-normal'
                                }`}>
                                {route.icon} {route.name}
                                {pathname === route.path && (
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
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
