import React from 'react'

function LeftSidebar() {
    return (
        <div
            id="left-sidebar"
            className="hidden lg:flex flex-col gap-2 w-full col-span-1 lg:col-span-4 xl:col-span-3">
            <div className="relative flex flex-col rounded-[1rem] bg-base-200 rounded-lg p-5 text-center">
                <figure className="mb-5 mx-5">
                    <img
                        src="/images/backdrop.svg"
                        alt="Header Photo"
                        className=" align-middle"
                    />
                </figure>
                <div>
                    <div className="flex justify-center -mt-16">
                        <div className="flex items-center gap-2">
                            <div className="avatar">
                                <div className="w-7 rounded-full !w-20 !rounded-full">
                                    <img
                                        src="/images/user.svg"
                                        alt="User Avatar"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="font-semibold flex items-center justify-center gap-2">
                        <div className="inline-flex items-center gap-1">
                            <svg
                                className="inline w-5 h-5 text-negative-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M12.277 20.925c-.092.026-.184.051-.277.075a12 12 0 0 1-8.5-15 12 12 0 0 0 8.5-3 12 12 0 0 0 8.5 3 12 12 0 0 1 .145 6.232" />
                                <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
                                <path d="M17 21l4-4" />
                            </svg>
                            <div className="text-negative-500">Navin Patil</div>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500" />
                </div>
            </div>
            <div className="card bg-base-200 rounded-lg p-5">
                <div className="pb-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-2xl font-bold">
                                My Employments
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-5">
                        <a
                            href="https://renewe.in/profile#employments"
                            className="btn normal-case btn-xs">
                            <svg
                                className="inline w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                            <span>Add Employment</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar
