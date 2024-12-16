import React from 'react'

const OverviewSection = ({
    selectedTab,
    companySize,
    companyType,
    description,
    children,
}) => {
    return (
        <div
            role="tabpanel"
            className={`tab-content space-y-2 ${
                selectedTab === 1 ? 'block' : 'hidden'
            }`}>
            <div className="bg-base-100 border-base-300 rounded-box p-5">
                <div className="text-xl font-bold">Overview</div>
                <div className="text-sm text-justify my-5">{description}</div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex-1 border-2 rounded-box ny-3 p-2">
                            <label className="pt-0 label label-text font-semibold">
                                <span>Company Size</span>
                            </label>
                            <div className="flex">
                                <div className="rounded-lg w-full flex items-center ">
                                    {companySize}
                                </div>
                            </div>
                        </div>

                        <div className="border-2 flex-1 rounded-box ny-3 p-2">
                            <label className="pt-0 label label-text font-semibold">
                                <span>Company Type</span>
                            </label>
                            <div className="flex">
                                <div className="rounded-lg w-full flex items-center ">
                                    {companyType}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {children && <>{children}</>}
        </div>
    )
}

export default OverviewSection
