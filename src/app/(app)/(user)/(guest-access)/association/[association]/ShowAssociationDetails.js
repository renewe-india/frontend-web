'use client'

import OverviewSection from '@/components/organization/publicView/OverviewSection'
import TabsNavigation from '@/components/organization/publicView/TabsNavigation'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { ConditionalRender } from '@/lib/utils'

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
            <TabsNavigation
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                tabs={tabs}
            />
            <ConditionalRender condition={selectedTab === 1}>
                <OverviewSection
                    selectedTab={selectedTab}
                    shortDescription={associationDetails.short_description}
                />
            </ConditionalRender>
            <ConditionalRender condition={selectedTab === 2}>
                <AboutSection
                    selectedTab={selectedTab}
                    organization={associationDetails}
                />
            </ConditionalRender>
            <ConditionalRender condition={selectedTab === 3}>
                <JobsSection selectedTab={selectedTab} />
            </ConditionalRender>
        </>
    )
}

export default ShowAssociationDetails
