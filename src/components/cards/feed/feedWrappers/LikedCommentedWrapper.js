import React from 'react'

const LikedCommentedWrapper = ({ author, via, children }) => {
    return (
        <div className="card card-bordered shadow-md bg-base-200 rounded-t-lg flex flex-col">
            <h4 className="p-2 border-b border-gray-200 dark:border-gray-600 pb-1">
                <span className="font-bold inline-flex">{author?.name}</span>
                <span>
                    {via === 'liked'
                        ? ' liked this post.'
                        : ' commented on this.'}
                </span>
            </h4>
            {children}
        </div>
    )
}

export default LikedCommentedWrapper
