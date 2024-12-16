'use client'
import React from 'react'
import FeedPost from './FeedPost'
import SharedWrapper from './feedWrappers/SharedWrapper'
import { NewsCardBasic, NewsCardWithActions } from '../news/NewsCard'
import LikedCommentedWrapper from './feedWrappers/LikedCommentedWrapper'
import PostActions from '../card-actions/PostActions'

const FeedCard = ({ posts }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 mx-4 mb-2">
                    <span className="text-xs font-semibold">Latest Posts</span>
                </div>
                <div className="flex-1 ml-2">
                    <div className="divider mt-0 mb-2" />
                </div>
            </div>
            <div className="space-y-4">
                {posts.map(post => {
                    switch (post.type) {
                        case 'news_article':
                            if (post.via === 'shared') {
                                return (
                                    <SharedWrapper
                                        key={post?.content?.slug}
                                        author={post?.author}>
                                        <NewsCardBasic
                                            article={post?.content}
                                        />
                                        <PostActions
                                            likes={
                                                post?.content?.reaction_count
                                            }
                                            comments={
                                                post?.content?.comments_count
                                            }
                                        />
                                    </SharedWrapper>
                                )
                            } else if (
                                post?.via === 'liked' ||
                                post?.via === 'commented'
                            ) {
                                return (
                                    <LikedCommentedWrapper
                                        key={post?.content?.slug}
                                        author={post?.author}
                                        via={post?.via}>
                                        <NewsCardWithActions
                                            article={post?.content}
                                        />
                                    </LikedCommentedWrapper>
                                )
                            } else {
                                return (
                                    <NewsCardWithActions
                                        key={post?.content?.slug}
                                        article={post?.content}
                                    />
                                )
                            }

                        case 'post':
                            return (
                                <FeedPost
                                    key={post?.content?.slug}
                                    post={post}
                                />
                            )

                        default:
                            return (
                                <NewsCardWithActions
                                    key={post?.content?.slug}
                                />
                            )
                    }
                })}
            </div>
        </div>
    )
}

export default FeedCard
