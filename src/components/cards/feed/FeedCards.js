'use client'
import React from 'react'
import FeedPost from './FeedPost'
import SharedWrapper from './feedWrappers/SharedWrapper'
import { NewsCardBasic, NewsCardWithActions } from '../news/NewsCard'
import LikedCommentedWrapper from './feedWrappers/LikedCommentedWrapper'
import PostActions from '../card-actions/PostActions'
import { cn } from '@/lib/utils'

function FeedCards({ posts }) {
    const renderNewsCard = post => {
        const {
            uuid,
            via,
            author_type: authorType,
            content: article,
            author,
            shared_at,
            comments,
            reactions,
        } = post

        const key = uuid

        if (via === 'shared') {
            return (
                <SharedWrapper
                    key={key}
                    author={author}
                    authorType={authorType}
                    sharedAt={shared_at}>
                    <NewsCardBasic
                        article={article}
                        authorType={'user'}
                        sharedAt={article?.published_at}
                    />
                    <PostActions
                        reactions={reactions}
                        comments={comments}
                        url={`/feeds/${key}`}
                    />
                </SharedWrapper>
            )
        }

        if (via === 'liked' || via === 'commented') {
            return (
                <LikedCommentedWrapper
                    key={key}
                    author={author}
                    authorType={authorType}
                    via={via}>
                    <NewsCardWithActions
                        article={article}
                        authorType={'user'}
                        sharedAt={shared_at}
                        comments={comments}
                        reactions={reactions}
                        url={`/feeds/${key}`}
                    />
                </LikedCommentedWrapper>
            )
        }

        return (
            <NewsCardWithActions
                key={key}
                article={article}
                authorType={'user'}
                sharedAt={shared_at}
                comments={comments}
                reactions={reactions}
                url={`/feeds/${key}`}
            />
        )
    }

    const renderContent = post => {
        const { uuid, type, content } = post
        const key = uuid

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
        <div className={cn('space-y-2')}>
            {posts.map(post => renderContent(post))}
        </div>
    )
}

export default FeedCards
