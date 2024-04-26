import { Plus, ShieldCheck } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

function LeftSidebar() {
    const [userData, setUserData] = useState(null)
    const { user } = useAuth({ middleware: 'auth' })
    useEffect(() => {
        setUserData(user)
    }, [user])

    return (
        <div
            id="left-sidebar"
            className="hidden lg:flex flex-col gap-2 w-full col-span-1 lg:col-span-4 xl:col-span-3">
            <div className="relative flex flex-col rounded-[1rem] bg-base-200 rounded-lg p-5 text-center">
                <figure className="mb-5 mx-5">
                    <img
                        src="/images/backdrop.svg"
                        alt="Header Photo"
                        className=" align-middle"
                    />
                </figure>
                <div>
                    <div className="flex justify-center -mt-16">
                        <div className="flex items-center gap-2">
                            <div className="avatar">
                                <div className="w-7 rounded-full !w-20 !rounded-full">
                                    <img
                                        src="/images/user.svg"
                                        alt="User Avatar"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {userData && (
                        <div className="font-semibold flex items-center justify-center gap-2">
                            <div className="inline-flex items-center gap-1">
                                <ShieldCheck
                                    size={24}
                                    stroke={2}
                                    color="red"
                                    weight="bold"
                                />
                                <div className="text-negative-500">
                                    {userData.name}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="text-sm text-gray-500" />
                </div>
            </div>
            <div className="card bg-base-200 rounded-lg p-5">
                <div className="pb-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-2xl font-bold">
                                My Employments
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-5">
                        <Link
                            href="/profile#employments"
                            className="btn bg-base-300 normal-case btn-xs">
                            <Plus size={24} stroke={2} />
                            <span>Add Employment</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar
