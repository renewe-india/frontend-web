import React from 'react'
import PostHeader from '../../card-actions/PostHeader'

const SharedWrapper = ({ author, sharedAt, authorType, children }) => {
    return (
        <PostHeader author={author} sharedAt={sharedAt} authorType={authorType}>
            {children}
        </PostHeader>
    )
}

export default SharedWrapper
