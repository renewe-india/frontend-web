'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Loading from '@/components/ui/Loading'
import Image from '@/components/Image'
import AboutSection from './(tabs)/AboutSection'
import JobsSection from './(tabs)/JobsSection'
import DetailsSection from './(tabs)/(detailsTab)/DetailsSection'
import { Plus } from '@phosphor-icons/react'
import FollowButton from '@/components/ui/FollowButton'

async function fetchBusinessDetails(businessName) {
    let businessDetails = {}

    try {
        const response = await axios.get(`/organizations/${businessName}`)
        businessDetails = response.data.data
    } catch (error) {
        // Handle error
    }

    return businessDetails
}

function ShowBusinessDetails({ businessName }) {
    const [businessDetails, setBusinessDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [selectedTab, setSelectedTab] = useState(1)

    useEffect(() => {
        if (businessName) {
            fetchBusinessDetails(businessName).then(details => {
                setBusinessDetails(details)
                setLoading(false)
            })
        }
    }, [businessName])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-5">
            <div className="relative w-full h-64 rounded-lg">
                <Image
                    src={businessDetails.backdrop?.url}
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute -bottom-20 left-5">
                    <Image
                        src={businessDetails.logo?.url}
                        className="avatar w-36 rounded-full border-4 border-white"
                    />
                </div>
            </div>
            <div className="mx-5 py-2 mt-12 flex flex-col gap-2">
                <div className="font-bold text-base md:text-xl flex items-center gap-2">
                    <div>{businessDetails.display_name} </div>
                    <FollowButton />
                </div>
                <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                    {businessDetails.tagline}
                </div>
                <div className="text-gray-500 text-xs md:text-sm">
                    <time dateTime={businessDetails.date_of_incorporation}>
                        {new Date(
                            businessDetails.date_of_incorporation,
                        ).toLocaleString('default', {
                            month: 'long',
                            day: 'numeric',
                        })}
                        ,{' '}
                        {new Date(
                            businessDetails.date_of_incorporation,
                        ).getFullYear()}
                    </time>
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
                    Overview
                </button>
                <button
                    role="tab"
                    className={`tab bg-transparent text-lg ${
                        selectedTab === 2 ? 'font-bold' : ''
                    }`}
                    aria-selected={selectedTab === 2}
                    onClick={() => setSelectedTab(2)}>
                    About
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
            <DetailsSection
                description={businessDetails.description}
                companySize={businessDetails.company_size}
                companyType={businessDetails.company_type}
                selectedTab={selectedTab}
                businessName={businessDetails.display_name}
            />
            <AboutSection
                shortDescription={businessDetails.short_description}
                selectedTab={selectedTab}
            />

            <JobsSection selectedTab={selectedTab} />
        </div>
    )
}

export default ShowBusinessDetails
