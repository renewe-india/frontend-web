'use client'

import {
    AddressBook,
    ArrowSquareOut,
    DotsThreeOutline,
    Gear,
    LinkSimple,
    PaperPlaneTilt,
    PaperclipHorizontal,
    Plus,
} from '@phosphor-icons/react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Loading from '@/components/Loading'

async function fetchBusinessDetails(businessHandle) {
    let businessDetails = {}

    try {
        const response = await axios.get(`/api/businesses/${businessHandle}`)
        businessDetails = response.data.data
        console.log(businessDetails)
    } catch (error) {
        console.error('Error fetching business details:', error)
    }

    return businessDetails
}

function ShowBusinessDetails({ businessHandle }) {
    const [businessDetails, setBusinessDetails] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (businessHandle) {
            fetchBusinessDetails(businessHandle).then(details => {
                setBusinessDetails(details)
                setLoading(false)
            })
        }
    }, [businessHandle])

    const [selectedTab, setSelectedTab] = useState(1)

    const handleFollow = e => {
        console.log('Follow functionality not implemented')
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-5">
            <div className="relative w-full h-64 rounded-lg">
                <img
                    src="https://picsum.photos/800/250"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute -bottom-20 left-5">
                    <div className="avatar">
                        <div className="w-36 rounded-full border-4 border-white">
                            <img src="https://picsum.photos/600" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-5 py-2 mt-12 flex flex-col gap-2">
                <div className="font-bold text-base md:text-xl flex items-center gap-2">
                    {businessDetails.name}
                </div>
                <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                    {businessDetails.tagline}
                </div>
                <div className="text-gray-500 text-xs md:text-sm">
                    <time dateTime={businessDetails.date_of_incorporation}>
                        <span>
                            {new Date(
                                businessDetails.date_of_incorporation,
                            ).toLocaleString('default', {
                                month: 'long',
                                day: 'numeric',
                            })}
                            ,
                        </span>
                        <span>
                            {new Date(
                                businessDetails.date_of_incorporation,
                            ).getFullYear()}
                        </span>
                    </time>
                </div>
            </div>
            <div className="flex flex-row gap-2 mx-5 mb-2">
                <div className="flex">
                    <button
                        onClick={handleFollow}
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
                <div className="flex">
                    <details className="dropdown dropdown-end items-center p-1 bg-base-100 normal-case rounded-full flex items-center gap-1">
                        <summary className="m-1 list-none">
                            <DotsThreeOutline size={18} weight="fill" />
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-36">
                            <li>
                                <Link
                                    href={`/businesses/${businessDetails.handle}/edit`}>
                                    <ArrowSquareOut size={18} />
                                    Edit
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/businesses/${businessDetails.handle}/managers`}>
                                    <PaperclipHorizontal size={18} />
                                    Managers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/businesses/${businessDetails.handle}/domains`}>
                                    <LinkSimple size={18} />
                                    Domains
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/businesses/${businessDetails.handle}/contact`}>
                                    <AddressBook size={18} />
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </details>
                </div>
            </div>
            <div
                role="tablist"
                className="tabs tabs-lifted mx-5 mb-2 dark:bg-gray-800">
                <button
                    role="tab"
                    className={`tab bg-transparent text-lg ${
                        selectedTab === 1 ? 'font-bold' : ''
                    }`}
                    aria-selected={selectedTab === 1}
                    onClick={() => setSelectedTab(1)}>
                    About
                </button>
                <button
                    role="tab"
                    className={`tab bg-transparent text-lg ${
                        selectedTab === 2 ? 'font-bold' : ''
                    }`}
                    aria-selected={selectedTab === 2}
                    onClick={() => setSelectedTab(2)}>
                    Overview
                </button>
                <button
                    role="tab"
                    className={`tab bg-transparent text-lg ${
                        selectedTab === 3 ? 'font-bold' : ''
                    }`}
                    aria-selected={selectedTab === 3}
                    onClick={() => setSelectedTab(3)}>
                    Jobs
                </button>
            </div>
            <div
                role="tabpanel"
                className={`tab-content bg-base-100 dark:bg-gray-700 border-base-300 rounded-box p-6 ${
                    selectedTab === 1 ? 'block' : 'hidden'
                }`}>
                <div className="text-xl font-bold">About</div>
                <div className="text-sm text-justify my-5">
                    {businessDetails.short_description}
                </div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 rounded-box ny-3 p-2">
                            <label className="pt-0 label label-text font-semibold">
                                <span>Email</span>
                            </label>
                            <div className="flex">
                                <div className="rounded-lg w-full flex items-center ">
                                    {businessDetails.email}
                                </div>
                            </div>
                        </div>

                        <div className="border-2 flex-1 rounded-box ny-3 p-2">
                            <label className="pt-0 label label-text font-semibold">
                                <span>Mobile No.</span>
                            </label>
                            <div className="flex">
                                <div className="rounded-lg w-full flex items-center ">
                                    {businessDetails.mobile}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                role="tabpanel"
                className={`tab-content bg-base-100 dark:bg-gray-700 border-base-300 rounded-box p-6 ${
                    selectedTab === 2 ? 'block' : 'hidden'
                }`}>
                <div className="text-xl font-bold">Overview</div>
                <div className="text-sm text-justify my-5">
                    {businessDetails.description}
                </div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex-1 border-2 rounded-box ny-3 p-2">
                            <label className="pt-0 label label-text font-semibold">
                                <span>Company Size</span>
                            </label>
                            <div className="flex">
                                <div className="rounded-lg w-full flex items-center ">
                                    {businessDetails.company_size}
                                </div>
                            </div>
                        </div>

                        <div className="border-2 flex-1 rounded-box ny-3 p-2">
                            <label className="pt-0 label label-text font-semibold">
                                <span>Company Type</span>
                            </label>
                            <div className="flex">
                                <div className="rounded-lg w-full flex items-center ">
                                    {businessDetails.company_type}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                role="tabpanel"
                className={`tab-content bg-base-100 dark:bg-gray-700 border-base-300 rounded-box p-6 ${
                    selectedTab === 3 ? 'block' : 'hidden'
                }`}>
                Tab content 3
            </div>
        </div>
    )
}

export default ShowBusinessDetails
