'use client'
import React from 'react'
import FeedPost from './FeedPost'
import SharedWrapper from './feedWrappers/SharedWrapper'
import { NewsCardBasic, NewsCardWithActions } from '../news/NewsCard'
import LikedCommentedWrapper from './feedWrappers/LikedCommentedWrapper'
import PostActions from '../card-actions/PostActions'
import { cn, ConditionalRender } from '@/lib/utils'

function FeedCards({ posts }) {
    const renderNewsCard = post => {
        const { via, content: article, author, shared_at } = post
        const key = article?.slug

        return (
            (
                <ConditionalRender condition={via === 'shared'}>
                    <SharedWrapper
                        key={key}
                        author={author}
                        sharedAt={shared_at}>
                        <NewsCardBasic
                            article={article}
                            sharedAt={article?.published_at}
                        />
                        <PostActions
                            likes={article?.reactions}
                            comments={article?.comments}
                            url={`/news/articles/${key}`}
                        />
                    </SharedWrapper>
                </ConditionalRender>
            ) || (
                <ConditionalRender
                    condition={via === 'liked' || via === 'commented'}>
                    <LikedCommentedWrapper key={key} author={author} via={via}>
                        <NewsCardWithActions
                            article={article}
                            sharedAt={shared_at}
                        />
                    </LikedCommentedWrapper>
                </ConditionalRender>
            ) || (
                <NewsCardWithActions
                    key={key}
                    article={article}
                    sharedAt={shared_at}
                />
            )
        )
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
        <div className={cn('space-y-2')}>
            {posts.map(post => renderContent(post))}
        </div>
    )
}

export default FeedCards
