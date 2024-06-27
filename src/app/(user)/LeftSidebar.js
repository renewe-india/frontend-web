import { Plus, ShieldCheck } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import Avatar from '@/components/Avatar'
import Background from '@/components/Image'

export const fetchData = async (key, collection) => {
    try {
        const response = await axios.get(
            `/api/media/users/${key}/${collection}/first`,
        )
        console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error('Error fetching data: ' + error.message)
    }
}

function LeftSidebar() {
    const [userData, setUserData] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [background, setBackground] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        setUserData(user)
    }, [user])
    useEffect(() => {
        const getData = async () => {
            try {
                const avatarData = await fetchData(user.username, 'avatar')
                setAvatar(avatarData.data)

                const backgroundData = await fetchData(
                    user.username,
                    'background',
                )
                setBackground(backgroundData.data)
                console.log(avatarData)
            } catch (error) {
                setError(error)
            }
        }

        if (user && user.username) {
            getData()
        }
    }, [user])

    return (
        <div
            id="left-sidebar"
            className="hidden lg:flex flex-col gap-2 w-full col-span-1 lg:col-span-4 xl:col-span-3">
            <div className="relative flex flex-col rounded-[1rem] bg-base-200 rounded-lg p-5 text-center">
                <figure className="mb-5 mx-5">
                    <Background
                        background={background}
                        customClass="align-middle"
                    />
                </figure>
                <div>
                    <div className="flex justify-center -mt-16">
                        <div className="flex items-center gap-2">
                            <Avatar
                                avatar={avatar}
                                customClass="w-7  !w-20 !rounded-full"
                            />
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
