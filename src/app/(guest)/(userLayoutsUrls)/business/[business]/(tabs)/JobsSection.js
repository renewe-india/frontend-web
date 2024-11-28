import React from 'react'

const JobsSection = ({ selectedTab }) => {
    return (
        <div
            role="tabpanel"
            className={`tab-content bg-base-100 dark:bg-gray-700 border-base-300 rounded-box p-6 ${
                selectedTab === 3 ? 'block' : 'hidden'
            }`}>
            <div className="flex flex-col items-center justify-center text-center">
                <img
                    src="/notFound/job-not-found.svg"
                    alt="No results found"
                    width={200}
                    height={200}
                />
                <div className="mt-4">Coming Soon</div>
            </div>
        </div>
    )
}

export default JobsSection
