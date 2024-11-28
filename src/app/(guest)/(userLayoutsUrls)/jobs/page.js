'use client'

import JobCard from '@/components/cards/JobCard'
import Loading from '@/components/ui/Loading'
// import axios from '@/lib/axios'
import React, { useEffect, useState } from 'react'

const JobPage = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                //const response = await axios.get('/api/v1/jobboard')
                setJobs([])
            } catch (error) {
                setJobs([])
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            {jobs.length === 0 ? (
                <div className="card bg-base-200 rounded-lg p-5">
                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src="/notFound/job-not-found.svg"
                            alt="No results found"
                            width={400}
                            height={400}
                        />

                        <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                            We're gearing up for something great! Stay tuned for
                            upcoming Job roles!
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-2">
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            )}
        </>
    )
}

export default JobPage
