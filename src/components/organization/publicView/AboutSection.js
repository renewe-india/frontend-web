import React from 'react'
import { Briefcase, Users, Calendar } from '@phosphor-icons/react/dist/ssr'
import { formatDate } from '@/lib/utils/FormatDate'

const AboutSection = ({ organization, selectedTab }) => {
    return (
        <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
                selectedTab === 2 ? 'block' : 'hidden'
            }`}>
            <div className="text-lg base:text-xl font-bold mb-4">About</div>
            <div className="text-sm text-justify mb-5">
                {organization?.description}
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 mt-4 space-y-4">
                <div className="flex items-start gap-5">
                    <Briefcase size="24" className="mr-2" />
                    <div className="flex flex-col gap-2">
                        <span className="text-base font-semibold">Type</span>
                        <span className="text-sm">
                            {organization?.company_type}
                        </span>
                    </div>
                </div>
                <div className="flex items-start gap-5">
                    <Users size="24" className="mr-2" />
                    <div className="flex flex-col gap-2">
                        <span className="text-base font-semibold">
                            Company Size
                        </span>
                        <span className="text-sm">
                            {organization?.company_size}
                        </span>
                    </div>
                </div>
                <div className="flex items-start gap-5">
                    <Calendar size="24" className="mr-2" />
                    <div className="flex flex-col gap-2">
                        <span className="text-base font-semibold">Founded</span>
                        <span className="text-sm">
                            {formatDate(organization?.date_of_incorporation)}
                        </span>
                    </div>
                </div>

                {organization?.tagline && (
                    <div className="flex items-start gap-5">
                        <Briefcase size="24" className="mr-2" />
                        <div className="flex flex-col gap-2">
                            <span className="text-base font-semibold">
                                Tagline
                            </span>
                            <span className="text-sm">
                                {organization?.tagline}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AboutSection
