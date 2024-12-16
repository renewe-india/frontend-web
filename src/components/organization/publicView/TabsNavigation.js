import React from 'react'

function TabsNavigation({ selectedTab, setSelectedTab, tabs }) {
    return (
        <div
            role="tablist"
            className="tabs tabs-lifted mx-5 mb-2 dark:bg-gray-800">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    role="tab"
                    className={`tab bg-transparent text-lg ${
                        selectedTab === index + 1 ? 'font-bold' : ''
                    }`}
                    aria-selected={selectedTab === index + 1}
                    onClick={() => setSelectedTab(index + 1)}>
                    {tab}
                </button>
            ))}
        </div>
    )
}

export default TabsNavigation
