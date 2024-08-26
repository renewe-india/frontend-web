'use client'
import JobCard from '@/components/dashboard/Cards/JobCard'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import { useOrganization } from '@/context/OrganizationContext'
import React from 'react'

function JobIndex({ jobs }) {
    const organization = useOrganization()
    return (
        <TitleCard
            title="Jobs"
            topMargin="mt-2"
            TopSideButtonLink={{
                href: `/manage/${organization.name}/jobs/add-new`,
                text: 'Add New Job',
            }}>
            <div className="container mx-auto lg:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map((job, index) => (
                        <JobCard
                            key={index}
                            title={job.title}
                            views={job.views}
                            applications={job.applications}
                            status={job.status}
                            jobId={job.jobId}
                        />
                    ))}
                </div>
            </div>
        </TitleCard>
    )
}

export default JobIndex
