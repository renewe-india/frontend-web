'use client'

import OverviewSection from '@/components/organization/publicView/OverviewSection'
import TabsNavigation from '@/components/organization/publicView/TabsNavigation'
import FollowButton from '@/components/ui/FollowButton'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const JobsSection = dynamic(() =>
    import('@/components/organization/publicView/JobsSection'),
)

const AboutSection = dynamic(() =>
    import('@/components/organization/publicView/AboutSection'),
)

function ShowAssociationDetails({ associationDetails }) {
    const [selectedTab, setSelectedTab] = useState(1)

    const tabs = ['Overview', 'About', 'Jobs']
    return (
        <>
            <div className="flex flex-row gap-2 mx-5 mb-2">
                <div className="flex">
                    <FollowButton
                        entityType={'organizations'}
                        entityName={associationDetails.name}
                        isFollowing={associationDetails.is_following}
                    />
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
