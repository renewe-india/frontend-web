import React from 'react'
import JobIndex from './JobIndex'
const jobs = [
    {
        title: 'Android App Developer',
        views: 7724,
        applications: 191,
        status: 'Closed',
        jobId: 1,
    },
    {
        title: 'Frontend Website Developer',
        views: 2836,
        applications: 199,
        status: 'Open',
        jobId: 2,
    },
    {
        title: 'Canva Graphic Designer',
        views: 6588,
        applications: 199,
        status: 'Closed',
        jobId: 3,
    },
]
const Page = () => {
    return <JobIndex jobs={jobs} />
}

export default Page
