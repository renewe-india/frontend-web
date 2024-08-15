import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CaretDown } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

function SidebarSubmenu({ submenu, name, icon }) {
    const router = useRouter()
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        if (submenu.some(m => m.path === router.pathname)) setIsExpanded(true)
    }, [router.pathname, submenu])

    return (
        <div className="flex flex-col">
            <div
                className="w-full flex items-center cursor-pointer "
                onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center flex-grow gap-2">
                    {icon} {name}
                </div>
                <CaretDown
                    className={`w-5 h-5 mt-1 ml-2 delay-400 duration-500 transition-all ${
                        isExpanded ? 'rotate-180' : ''
                    }`}
                />
            </div>

            {/** Submenu list */}
            <div className={`w-full ${isExpanded ? '' : 'hidden'}`}>
                <ul className={`menu menu-compact`}>
                    {submenu.map((m, k) => (
                        <li key={k}>
                            <Link href={m.path}>
                                <div className="flex items-center">
                                    {m.icon} {m.name}
                                    {router.pathname === m.path && (
                                        <span
                                            className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SidebarSubmenu
