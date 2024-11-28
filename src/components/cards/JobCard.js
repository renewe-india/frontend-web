'use client'

import React from 'react'
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
} from '@phosphor-icons/react'
import Link from 'next/link'

function JobCard() {
    return (
        <div className="card bg-base-200 rounded-lg p-5 shadow-md">
            <div className="pb-5">
                {/* Header Section */}
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
                            className="btn normal-case btn-circle btn-sm">
                            <ShareNetwork size={24} />
                        </button>
                        <button
                            type="button"
                            className="btn normal-case btn-circle btn-sm">
                            <Heart size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Job Details Section */}
            <div>
                <div className="space-y-2">
                    {/* Job Information Grid */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="inline-flex items-center gap-2">
                            <Money size={24} />
                            <div>₹1,000,000.00/Year</div>
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <PlusSquare size={24} />
                            <div>₹200,000.00/Year</div>
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <MapPin size={24} />
                            <div>Mumbai, India</div>
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <Buildings size={24} />
                            <div>Full Time</div>
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <CalendarCheck size={24} />
                            <div>3-5 Years</div>
                        </div>
                    </div>

                    {/* Job Benefits */}
                    <div className="flex flex-wrap gap-1">
                        <div className="badge">Family Health Insurance</div>
                        <div className="badge">Travel Allowance</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href={'/jobs/view'}
                            className="btn normal-case w-full btn-outline">
                            <CheckCircle size={24} />
                            Apply
                            <div className="badge">26</div>
                        </Link>
                        <button className="btn normal-case w-full btn-outline">
                            <Repeat size={24} />
                            Repost
                            <div className="badge">169</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobCard
