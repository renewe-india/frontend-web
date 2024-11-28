import React from 'react'

function ComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <img
                src="/errorCode/coming-soon.svg"
                alt="No results found"
                width={400}
                height={400}
            />
            <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl ">
                We're working on something amazing!
            </p>
            <p className="mb-4 text-lg  text-gray-500 dark:text-gray-400">
                Our team is hard at work building a new experience for you. Stay
                tuned for updates!
            </p>
        </div>
    )
}

export default ComingSoon
