import ComingSoon from '@/components/ui/ComingSoon'
import React from 'react'

const JobsSection = ({ selectedTab }) => {
    return (
        <div
            role="tabpanel"
            className={`tab-content bg-base-100 dark:bg-gray-700 border-base-300 rounded-box p-6 ${
                selectedTab === 3 ? 'block' : 'hidden'
            }`}>
            <div className="flex flex-col items-center justify-center  text-center">
                <ComingSoon />
            </div>
        </div>
    )
}

export default JobsSection
