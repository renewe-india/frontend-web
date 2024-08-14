import {
    ShareNetwork,
    Heart,
    Money,
    PlusSquare,
    MapPin,
    Buildings,
    CalendarCheck,
    CheckCircle,
    Repeat,
} from '@phosphor-icons/react/dist/ssr'
import React from 'react'

const Card = () => {
    return (
        <div className="card bg-base-200 rounded-lg p-5">
            <div className="pb-5">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-bold">Sales Manager</div>
                        <div className="text-gray-500 text-sm mt-1">
                            2 Days Remaining
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            // onClick={() => job_post_share_1.showModal()}
                            className="btn normal-case btn-circle btn-sm">
                            <span className="block">
                                <ShareNetwork size={24} />
                            </span>
                        </button>
                        <button
                            type="button"
                            className="btn normal-case btn-circle btn-sm">
                            <span className="block">
                                <Heart size={24} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="inline-flex items-center gap-1">
                            <Money size={24} />
                            <div>₹1,000,000.00/Year</div>
                        </div>
                        <div className="inline-flex items-center gap-1">
                            <PlusSquare size={24} /> <div>₹200,000.00/Year</div>
                        </div>
                        <div className="inline-flex items-center gap-1">
                            <MapPin size={24} />
                            <div>Mumbai, India</div>
                        </div>
                        <div className="inline-flex items-center gap-1">
                            <Buildings size={24} />
                            <div>Full Time</div>
                        </div>
                        <div className="inline-flex items-center gap-1">
                            <CalendarCheck size={24} />
                            <div>3-5 Years</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        <div className="badge">Family Health Insurance</div>
                        <div className="badge">Travel Allowance</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 justify-center justify-items-center">
                        <button className="btn normal-case w-full btn-outline">
                            <span className="block">
                                <CheckCircle size={24} />
                            </span>
                            Apply
                            <div className="badge">26</div>
                        </button>
                        <button className="btn normal-case w-full btn-outline ">
                            <span className="block">
                                <Repeat size={24} />
                            </span>
                            Repost
                            <div className="badge">169</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
