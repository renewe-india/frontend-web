'use client'
import React from 'react'
import FeedPost from './FeedPost'
import SharedWrapper from './feedWrappers/SharedWrapper'
import { NewsCardBasic, NewsCardWithActions } from '../news/NewsCard'
import LikedCommentedWrapper from './feedWrappers/LikedCommentedWrapper'
import PostActions from '../card-actions/PostActions'

function FeedCards({ posts }) {
    const renderNewsCard = post => {
        const { via, content, author } = post
        const key = content?.slug

        if (via === 'shared') {
            return (
                <SharedWrapper key={key} author={author}>
                    <NewsCardBasic article={content} />
                    <PostActions
                        likes={content?.reaction_count}
                        comments={content?.comments_count}
                    />
                </SharedWrapper>
            )
        } else if (via === 'liked' || via === 'commented') {
            return (
                <LikedCommentedWrapper key={key} author={author} via={via}>
                    <NewsCardWithActions article={content} />
                </LikedCommentedWrapper>
            )
        } else {
            return <NewsCardWithActions key={key} article={content} />
        }
    }

    const renderContent = post => {
        const { type, content } = post
        const key = content?.slug

        switch (type) {
            case 'news_article':
                return renderNewsCard(post)
            case 'job':
            case 'event':
            default:
                return <FeedPost key={key} post={content} />
        }
    }

    return (
        <div className="space-y-5">
            {posts.map(post => renderContent(post))}
        </div>
    )
}

export default FeedCards
