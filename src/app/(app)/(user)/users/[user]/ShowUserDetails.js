'use client'
import { PaperPlaneTilt, Plus } from '@phosphor-icons/react'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Loading from '@/components/ui/Loading'
import Image from '@/components/Image'

async function fetchUserDetails(username) {
    let userDetails = {}

    try {
        const response = await axios.get(`/users/${username}`)
        userDetails = response.data.data
    } catch (error) {
        // console.error('Error fetching business details:', error)
    }

    return userDetails
}

function ShowUserDetails({ username }) {
    // const [isFollowing, setIsFollowing] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (username) {
            fetchUserDetails(username).then(details => {
                setUserDetails(details)
                setLoading(false)
            })
        }
    }, [username])

    const nameFollow = () => {
        //check api
        //setIsFollowing(prevState => !prevState)
        // console.log(isFollowing ? 'Unfollowed' : 'Followed')
    }
    if (loading) {
        return <Loading />
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-5">
            <div className="relative w-full h-64 rounded-lg">
                <Image
                    data={userDetails?.backdrop}
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute -bottom-20 left-5">
                    <Image
                        data={userDetails?.avatar}
                        className="avatar w-36 rounded-full border-4 border-white"
                    />
                </div>
            </div>
            <div className="mx-5 py-2 mt-12 flex flex-col gap-2">
                <div className="font-bold text-base md:text-xl flex items-center gap-2">
                    {userDetails.name}
                </div>
                <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                    {userDetails.bio}
                </div>
                <div className="text-gray-500 text-xs md:text-sm">
                    <time dateTime={userDetails.date_of_birth}>
                        <span>
                            {new Date(userDetails.date_of_birth).toLocaleString(
                                'default',
                                {
                                    month: 'long',
                                    day: 'numeric',
                                },
                            )}
                            ,
                        </span>
                        <span>
                            {new Date(userDetails.date_of_birth).getFullYear()}
                        </span>
                    </time>
                </div>
            </div>
            <div className="flex flex-row gap-2 mx-5 mb-2">
                <div className="flex">
                    <button
                        onClick={nameFollow}
                        className="btn bg-base-100 normal-case btn-sm flex items-center gap-1">
                        <Plus size={18} weight="bold" />
                        <span>Follow</span>
                    </button>
                </div>
                <div className="flex">
                    <button className="btn bg-base-100 normal-case btn-sm flex items-center gap-1">
                        <PaperPlaneTilt size={18} weight="bold" />
                        <span>Message</span>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{userDetails.headline}</h2>
                <p>{userDetails.bio}</p>
            </div>
        </div>
    )
}

export default ShowUserDetails
