import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-inherit flex flex-col ">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src="/errorCode/404.svg"
                            alt="No results found"
                            width={400}
                            height={400}
                        />
                        <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl ">
                            Page Not Found, Something's missing.
                        </p>
                        <p className="mb-4 text-lg  text-gray-500 dark:text-gray-400">
                            "Sorry, we can't find that page. You'll find lots to
                            explore on the home page."{' '}
                        </p>
                    </div>

                    <Link href="/" className="btn btn-success text-white ">
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page
