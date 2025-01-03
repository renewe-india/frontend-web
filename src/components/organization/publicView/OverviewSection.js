import React from 'react'

const OverviewSection = ({ selectedTab, shortDescription, children }) => {
    return (
        <div
            role="tabpanel"
            className={`tab-content space-y-2 ${
                selectedTab === 1 ? 'block' : 'hidden'
            }`}>
            <div className="bg-base-100 border-base-300 rounded-box p-5">
                <div className="text-lg base:text-xl font-bold mb-4">
                    Overview
                </div>
                <div className="text-sm text-justify">{shortDescription}</div>
            </div>
            {children && <>{children}</>}
        </div>
    )
}

export default OverviewSection
