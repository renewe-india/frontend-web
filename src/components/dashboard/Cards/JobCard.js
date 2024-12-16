import { Copy, Eye, Note } from '@phosphor-icons/react'
import React from 'react'
import { useRouter } from 'next/navigation'

const JobCard = ({ title, views, applications, status, jobId }) => {
    const router = useRouter()

    const handlePostSimilarJob = () => {
        router.push(`/jobs/new?similarJobId=${jobId}`)
    }

    const handleViewJob = () => {
        router.push(`/jobs/${jobId}`)
    }

    const handleViewApplications = () => {
        router.push(`/jobs/${jobId}/applications`)
    }

    return (
        <div className="card shadow-lg rounded-lg p-4 bg-base-100">
            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center">
                <h2 className="card-title text-lg font-bold w-full xl:w-auto">
                    {title}
                </h2>
                <span
                    className={`badge mt-2 xl:mt-0 ${
                        status === 'Closed'
                            ? 'badge-outline'
                            : 'badge-success text-white'
                    }`}>
                    {status}
                </span>
            </div>

            <div className="mt-2 text-sm flex items-center space-x-2 badge text-blue-500 badge-outline">
                <Eye size={20} />
                <span>{views} views</span>
            </div>

            <div className="mt-4 flex flex-col space-y-4 xl:space-y-0 xl:flex-row xl:justify-between xl:items-center">
                <div className="flex flex-col space-y-2 ">
                    <button
                        onClick={handlePostSimilarJob}
                        className="flex items-center text-left text-sm text-blue-500 space-x-2">
                        <Copy size={20} />
                        <span>Post similar job</span>
                    </button>
                    <button
                        onClick={handleViewJob}
                        className="flex items-center text-left text-sm text-blue-500 space-x-2">
                        <Note size={20} />
                        <span>View job</span>
                    </button>
                </div>

                <button
                    onClick={handleViewApplications}
                    className="btn btn-primary mt-4 xl:mt-0 w-full xl:w-auto">
                    View applications ({applications})
                </button>
            </div>
        </div>
    )
}

export default JobCard
