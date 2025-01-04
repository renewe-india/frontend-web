import Image from '@/components/Image'
import MainCard from '@/components/ui/MainCard'
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
            <MainCard>
                <div className="pb-5">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">
                            Upcoming Events
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col">
                        <div className="flex gap-2 items-start">
                            <div className="mt-1 flex items-center gap-2">
                                <Image
                                    src="https://picsum.photos/300"
                                    customClass="rounded-full avatar w-7"
                                />
                            </div>

                            <div>
                                <div className="font-semibold mb-2">
                                    Renewable Energy India Expo
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <CalendarDots
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                    3rd Jan, 24 - 6th Jan, 24
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <MapPinArea
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                    India Expo Center, Greater Noida, India
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <Buildings
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                    Informa Markets India Pvt. Ltd.
                                </div>
                            </div>
                        </div>

                        <div className="border-b my-2" />

                        <div className="flex gap-2 items-start">
                            <div className="mt-1 flex items-center gap-2">
                                <Image
                                    src="https://picsum.photos/300"
                                    customClass="rounded-full avatar w-7"
                                />
                            </div>
                            <div>
                                <div className="font-semibold mb-2">
                                    Renewable Energy India Expo
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <CalendarDots
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                    3rd Jan, 24 - 6th Jan, 24
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <MapPinArea
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                    India Expo Center, Greater Noida, India
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2">
                                    <Buildings
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                    Informa Markets India Pvt. Ltd.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainCard>
            <MainCard>
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
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td
                                    className="text-xl font-semibold"
                                    colSpan="2">
                                    Sales Executive
                                </td>
                            </tr>
                            <tr className="text-sm text-gray-500">
                                <td className="flex gap-2">
                                    <Buildings
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                </td>
                                <td>Spinkraft Pvt. Ltd.</td>
                            </tr>
                            <tr className="text-sm text-gray-500">
                                <td className="flex gap-2">
                                    <MapPinArea
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                </td>
                                <td>Haryana, India</td>
                            </tr>
                            <tr className="text-sm text-gray-500">
                                <td className="flex gap-2">
                                    <CurrencyInr size={18} />
                                </td>
                                <td>12,50,000 to 20,00,000</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="border-b my-2" />

                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td
                                    className="text-xl font-semibold mb-2"
                                    colSpan="2">
                                    Sales Executive
                                </td>
                            </tr>
                            <tr className="text-sm text-gray-500">
                                <td className="flex gap-2">
                                    <Buildings
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                </td>
                                <td>Spinkraft Pvt. Ltd.</td>
                            </tr>
                            <tr className="text-sm text-gray-500">
                                <td className="flex gap-2">
                                    <MapPinArea
                                        size={24}
                                        className="flex-shrink-0"
                                    />
                                </td>
                                <td>Haryana, India</td>
                            </tr>
                            <tr className="text-sm text-gray-500">
                                <td className="flex gap-2">
                                    <CurrencyInr size={18} />
                                </td>
                                <td>12,50,000 to 20,00,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </MainCard>
        </div>
    )
})
RightSidebar.displayName = 'RightSidebar'
export default RightSidebar
