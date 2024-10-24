import React from 'react'
import dynamic from 'next/dynamic'

const Carousel = dynamic(() => import('./Carousel'), {
    loading: () => <div>Loading...</div>,
})
const HeroProductList = dynamic(
    () => import('@/components/cards/HeroProductCard'),
    {
        loading: () => <div>Loading...</div>,
    },
)
const CertificationSection = dynamic(() => import('./CertificationSection'), {
    loading: () => <div>Loading...</div>,
})

const DetailsSection = ({
    description,
    companySize,
    companyType,
    selectedTab,
    businessName,
}) => {
    return (
        <div
            role="tabpanel"
            className={`tab-content space-y-2 ${
                selectedTab === 1 ? 'block' : 'hidden'
            }`}>
            <div className="bg-base-100 dark:bg-gray-700 border-base-300 p-5 rounded-box">
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
            <div className="bg-base-100  border-base-300 p-5 rounded-box">
                <Carousel />
            </div>
            <div className="bg-base-100  border-base-300 p-5 rounded-box">
                <CertificationSection businessName={businessName} />
            </div>{' '}
            <div className="bg-base-100  border-base-300 p-5 rounded-box">
                <HeroProductList />
            </div>
        </div>
    )
}

export default DetailsSection
