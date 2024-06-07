import { X } from '@phosphor-icons/react'
import React from 'react'

function NotificationPanel() {
    return (
        <div className="drawer absolute z-50 drawer-end">
            <input
                id="notifications"
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-side">
                <label htmlFor="notifications" className="drawer-overlay" />

                <div className="card bg-base-100 rounded-lg p-5 min-h-screen rounded-none px-8 w-full md:max-w-md shadow dark:shadow-white">
                    <div className="pb-5">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold">
                                    Notifications
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const checkbox = document.getElementById(
                                            'notifications',
                                        )
                                        if (checkbox) checkbox.checked = false
                                    }}
                                    className="btn normal-case btn-ghost btn-sm">
                                    <span className="block">
                                        <X size={24} stroke={2} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col gap-2">
                            <div className="p-2 shadow dark:shadow-white rounded-lg">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="avatar">
                                            <div className="w-7 rounded-full !w-10">
                                                <img
                                                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                                    alt="profile"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold font-lg">
                                                Grishma Khedekar
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                Liked a Post
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-500">
                                        17m ago
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a
                                </div>
                            </div>
                            {/* Item */}
                            {/* Item */}
                            <div className="p-2 shadow dark:shadow-white rounded-lg">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="avatar">
                                            <div className="w-7 rounded-full !w-10 !rounded">
                                                <img
                                                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                                    alt="profile"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold font-lg">
                                                Spinkraft Ventures Private
                                                Limited
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                Share A Post
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-500">
                                        17m ago
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    Lorem Ipsum is simply dummy text of
                                </div>
                            </div>
                            {/* Item */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationPanel
