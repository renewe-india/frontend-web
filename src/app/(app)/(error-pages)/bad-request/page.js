import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-inherit flex flex-col ">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                        400
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        Bad Request.
                    </p>
                    <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">
                        "Uh oh... Your browser sent something I don't
                        understand."{' '}
                    </p>
                    <Link
                        href="/"
                        className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4">
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page
