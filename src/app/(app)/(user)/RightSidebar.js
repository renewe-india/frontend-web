import {
    Buildings,
    CalendarDots,
    CurrencyInr,
    MapPinArea,
} from '@phosphor-icons/react/dist/ssr'
import React, { memo } from 'react'

const RightSidebar = memo(() => {
    return (
        <div id="right-sidebar" className="hidden xl:flex flex-col gap-2 ">
            <div className="card bg-base-200 rounded-lg p-5 shadow-md">
                <div className="pb-5">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">
                            Upcoming Events
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="avatar">
                                        <div className="w-7 rounded-full">
                                            <img src="https://picsum.photos/300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold">
                                    Renewable Energy India Expo
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <CalendarDots size={24} />
                                    3rd Jan, 24 - 6th Jan, 24
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <MapPinArea size={24} />
                                    India Expo Center, Greater Noida, India
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <Buildings size={24} />
                                    Informa Markets India Pvt. Ltd.
                                </div>
                            </div>
                        </div>

                        <div className="border-b my-2" />

                        <div className="flex gap-2">
                            <div className="flex items-center gap-2">
                                <div className="avatar">
                                    <div className="w-7 rounded-full">
                                        <img src="https://picsum.photos/300" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold">
                                    Renewable Energy India Expo
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <CalendarDots size={24} />
                                    3rd Jan, 24 - 6th Jan, 24
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <MapPinArea size={24} />
                                    India Expo Center, Greater Noida, India
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <Buildings size={24} />
                                    Informa Markets India Pvt. Ltd.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card bg-base-200 rounded-lg p-5 shadow-md">
                <div className="pb-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-2xl font-bold">
                                Job Openings
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold">Sales Executive</div>
                        <div className="text-sm text-gray-500 flex gap-2">
                            <Buildings size={24} />
                            Spinkraft Pvt. Ltd.
                        </div>
                        <div className="text-sm text-gray-500 flex gap-2">
                            <MapPinArea size={24} />
                            Haryana, India
                        </div>
                        <div className="text-sm text-gray-500 flex gap-2">
                            <CurrencyInr size={18} />
                            12,50,000 to 20,00,000
                        </div>
                    </div>

                    <div className="border-b my-2" />

                    <div className="flex flex-col gap-1">
                        <div className="font-semibold">Sales Executive</div>
                        <div className="text-sm text-gray-500 flex gap-2">
                            <Buildings size={24} />
                            Spinkraft Pvt. Ltd.
                        </div>
                        <div className="text-sm text-gray-500 flex gap-2">
                            <MapPinArea size={24} />
                            Haryana, India
                        </div>
                        <div className="text-sm text-gray-500 flex gap-2">
                            <CurrencyInr size={18} />
                            12,50,000 to 20,00,000
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
RightSidebar.displayName = 'RightSidebar'
export default RightSidebar
