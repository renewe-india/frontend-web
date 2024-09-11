import React from 'react'

const AboutSection = ({ shortDescription, selectedTab }) => {
    return (
        <div
            role="tabpanel"
            className={`tab-content bg-base-100 dark:bg-gray-700 border-base-300 rounded-box p-6 ${
                selectedTab === 2 ? 'block' : 'hidden'
            }`}>
            <div className="text-xl font-bold">About</div>
            <div className="text-sm text-justify my-5">{shortDescription}</div>
        </div>
    )
}

export default AboutSection
