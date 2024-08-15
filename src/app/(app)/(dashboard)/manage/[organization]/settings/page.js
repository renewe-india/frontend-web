import React from 'react'

function page() {
    return (
        <div className="flex card bg-base-100 rounded-lg mx-2 md:mx-0 mb-2 w-full flex flex-col">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-5xl tracking-tight font-extrabold lg:text-7xl text-primary-600 dark:text-primary-500">
                        Coming Soon
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl dark:text-white">
                        We're working on something amazing!
                    </p>
                    <p className="mb-4 text-lg  text-gray-500 dark:text-gray-400">
                        Our team is hard at work building a new experience for
                        you. Stay tuned for updates!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page
