import Image from '@/components/Image'
import { BookmarkSimple, EyeSlash, Flag } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

const PostHeader = ({ author, sharedAt, children, className }) => (
    <div className="card card-bordered shadow-md bg-base-200 rounded-lg">
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
                <Image
                    data={author?.avatar}
                    alt={author?.name}
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h4 className="font-semibold">{author?.name}</h4>
                    {sharedAt && (
                        <span className="text-sm text-gray-500">
                            {sharedAt}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button className="btn btn-sm text-primary shadow-none">
                    + Follow
                </button>
                <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-ghost btn-sm">
                        ⋮
                    </button>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-40">
                        <li>
                            <button className="flex items-center gap-2">
                                <BookmarkSimple size={24} />
                                Save Post
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center gap-2">
                                <EyeSlash size={24} />
                                Hide Post
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center gap-2">
                                <Flag size={24} />
                                Report
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className={className}> {children}</div>
    </div>
)

export default PostHeader
