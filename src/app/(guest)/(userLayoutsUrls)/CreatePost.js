'use client'
import Image from '@/components/Image'
import { Article, Briefcase, Images } from '@phosphor-icons/react'
import React from 'react'
import CreatePostModal from './CreatePostModal'
import { useUser } from '@/context/UserContext'

function CreatePost() {
    const { user } = useUser()
    if (!user) {
        return null
    }
    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5">
                <div className="flex flex-col space-y-4">
                    <div className="flex gap-4 items-center w-full">
                        {/* Profile Image */}
                        <div className="avatar w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                                data={user?.avatar}
                                alt="Profile"
                                customClass="w-full h-full object-cover"
                            />
                        </div>
                        {/* Input Field */}
                        <div
                            onClick={() => {
                                document
                                    .getElementById('create-post-modal')
                                    .showModal()
                            }}
                            className="input input-primary input-bordered rounded-full flex items-center justify-start w-full h-12 cursor-pointer">
                            <div className="text-gray-500">
                                Start a New Post
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                        {/* Media Button */}
                        <div className=" flex items-center justify-center">
                            <button className="btn btn-ghost">
                                <Images
                                    size={20}
                                    className="mr-2"
                                    color="blue"
                                    weight="fill"
                                />
                                Media
                            </button>
                        </div>
                        {/* Job Button */}
                        <div className=" flex items-center justify-center">
                            <button className="btn btn-ghost">
                                <Briefcase
                                    size={20}
                                    className="mr-2"
                                    color="purple"
                                    weight="fill"
                                />
                                Job
                            </button>
                        </div>
                        {/* Write Article Button */}
                        <div className=" flex items-center justify-center">
                            <button className="btn btn-ghost">
                                <Article
                                    size={20}
                                    className="mr-2"
                                    color="orange"
                                    weight="fill"
                                />
                                Write Article
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <CreatePostModal />
        </>
    )
}

export default CreatePost
