import React from 'react'
import BackdropSkeleton from './BackdropSkeleton'
import AvatarSkeleton from './AvatarSkeleton'

function LeftSidebarSkeleton() {
    const UserProfileSkeleton = () => (
        <div className="relative flex flex-col rounded-[1rem] bg-base-200 p-5 text-center">
            <div className="mb-5 mx-5">
                <BackdropSkeleton />
            </div>
            <div>
                <div className="flex justify-center -mt-16">
                    <AvatarSkeleton />
                </div>
                <div className="skeleton h-4 bg-gray-300 rounded-full w-32 mx-auto mt-4" />
                <div className="skeleton h-3 bg-gray-300 rounded-full w-20 mx-auto mt-2" />
            </div>
        </div>
    )

    const EmploymentSectionSkeleton = () => (
        <div className="card bg-base-200 rounded-lg p-5">
            <div className="skeleton h-6 bg-gray-300 rounded w-48 mb-5" />
            <div className="skeleton h-8 bg-gray-300 rounded w-32" />
        </div>
    )
    return (
        <>
            <UserProfileSkeleton />
            <EmploymentSectionSkeleton />
        </>
    )
}

export default LeftSidebarSkeleton
