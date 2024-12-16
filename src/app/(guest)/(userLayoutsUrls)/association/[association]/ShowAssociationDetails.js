'use client'

import OverviewSection from '@/components/organization/publicView/OverviewSection'
import TabsNavigation from '@/components/organization/publicView/TabsNavigation'
import { PaperPlaneTilt, Plus } from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const JobsSection = dynamic(() =>
    import('@/components/organization/publicView/JobsSection'),
)

const AboutSection = dynamic(() =>
    import('@/components/organization/publicView/AboutSection'),
)

function ShowAssociationDetails({ associationDetails }) {
    // const [isFollowing, setIsFollowing] = useState(false)

    const [selectedTab, setSelectedTab] = useState(1)

    const nameFollow = () => {
        //check api
        //setIsFollowing(prevState => !prevState)
        // console.log(isFollowing ? 'Unfollowed' : 'Followed')
    }
    const tabs = ['Overview', 'About', 'Jobs']
    return (
        <>
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
            <TabsNavigation
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                tabs={tabs}
            />
            {selectedTab === 1 && (
                <OverviewSection
                    selectedTab={selectedTab}
                    description={associationDetails.description}
                    companySize={associationDetails.company_size}
                    companyType={associationDetails.company_type}
                />
            )}
            {selectedTab === 2 && (
                <AboutSection
                    selectedTab={selectedTab}
                    shortDescription={associationDetails.short_description}
                />
            )}
            {selectedTab === 3 && <JobsSection selectedTab={selectedTab} />}
        </>
    )
}

export default ShowAssociationDetails
