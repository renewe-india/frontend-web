import React from 'react'

const SkeletonCard = () => {
    return (
        <div className="card bg-base-200 rounded-lg p-5">
            <div className="flex flex-col gap-2">
                <div className="ml-7 flex gap-2">
                    <div className="w-24 h-24 bg-gray-300 rounded animate-pulse" />
                    <div className="px-2 flex flex-col gap-2">
                        <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse" />
                        <div className="w-full h-4 bg-gray-300 rounded animate-pulse" />
                    </div>
                </div>
                <div className="mx-7 flex justify-between border-b border-gray-200 dark:border-gray-600 pb-1">
                    <div className="w-1/3 h-4 bg-gray-300 rounded animate-pulse" />
                    <div className="flex gap-4">
                        <div className="w-1/4 h-4 bg-gray-300 rounded animate-pulse" />
                        <div className="w-1/4 h-4 bg-gray-300 rounded animate-pulse" />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <div className="w-full h-10 bg-gray-300 rounded animate-pulse" />
                    <div className="w-full h-10 bg-gray-300 rounded animate-pulse" />
                    <div className="w-full h-10 bg-gray-300 rounded animate-pulse" />
                    <div className="w-full h-10 bg-gray-300 rounded animate-pulse" />
                </div>
            </div>
        </div>
    )
}

const SkeletonImage = () => {
    return <div className="w-24 h-24 bg-gray-300 rounded animate-pulse" />
}

export { SkeletonCard, SkeletonImage }
