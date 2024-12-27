'use client'
import React from 'react'
import FeedPost from './FeedPost'
import SharedWrapper from './feedWrappers/SharedWrapper'
import { NewsCardBasic, NewsCardWithActions } from '../news/NewsCard'
import LikedCommentedWrapper from './feedWrappers/LikedCommentedWrapper'
import PostActions from '../card-actions/PostActions'

function FeedCards({ posts }) {
    const renderNewsCard = post => {
        const { via, content: article, author, shared_at } = post
        const key = article?.slug

        if (via === 'shared') {
            return (
                <SharedWrapper key={key} author={author} sharedAt={shared_at}>
                    <NewsCardBasic
                        article={article}
                        sharedAt={article?.published_at}
                    />
                    <PostActions
                        likes={article?.reactions}
                        comments={article?.comments}
                        url={`/news/articles/${key}/comments`}
                    />
                </SharedWrapper>
            )
        } else if (via === 'liked' || via === 'commented') {
            return (
                <LikedCommentedWrapper key={key} author={author} via={via}>
                    <NewsCardWithActions
                        article={article}
                        sharedAt={shared_at}
                    />
                </LikedCommentedWrapper>
            )
        } else {
            return (
                <NewsCardWithActions
                    key={key}
                    article={article}
                    sharedAt={shared_at}
                />
            )
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
