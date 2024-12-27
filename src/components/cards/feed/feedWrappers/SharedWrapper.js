import React from 'react'
import PostHeader from '../../card-actions/PostHeader'

const SharedWrapper = ({ author, sharedAt, children }) => {
    return (
        <PostHeader author={author} sharedAt={sharedAt}>
            {children}
        </PostHeader>
    )
}

export default SharedWrapper
