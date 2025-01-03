'use client'

import OverviewSection from '@/components/organization/publicView/OverviewSection'
import TabsNavigation from '@/components/organization/publicView/TabsNavigation'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const JobsSection = dynamic(() =>
    import('@/components/organization/publicView/JobsSection'),
)
const AboutSection = dynamic(() =>
    import('@/components/organization/publicView/AboutSection'),
)
const Carousel = dynamic(() => import('./(tabs)/(OverviewTab)/Carousel'))
const HeroProductList = dynamic(() =>
    import('@/components/cards/HeroProductCard'),
)
const CertificationSection = dynamic(() =>
    import('./(tabs)/(OverviewTab)/CertificationSection'),
)

function ShowBusinessDetails({ businessDetails }) {
    const [selectedTab, setSelectedTab] = useState(1)

    const tabs = ['Overview', 'About', 'Jobs']
    return (
        <>
            <TabsNavigation
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                tabs={tabs}
            />
            {selectedTab === 1 && (
                <OverviewSection
                    selectedTab={selectedTab}
                    shortDescription={businessDetails.short_description}>
                    <div className="bg-base-100  border-base-300 p-5 rounded-box">
                        <Carousel />
                    </div>
                    <div className="bg-base-100  border-base-300 p-5 rounded-box">
                        <CertificationSection
                            businessName={businessDetails.display_name}
                        />
                    </div>
                    <div className="bg-base-100  border-base-300 p-5 rounded-box">
                        <HeroProductList />
                    </div>
                </OverviewSection>
            )}
            {selectedTab === 2 && (
                <AboutSection
                    selectedTab={selectedTab}
                    organization={businessDetails}
                />
            )}
            {selectedTab === 3 && <JobsSection selectedTab={selectedTab} />}
        </>
    )
}

export default ShowBusinessDetails
