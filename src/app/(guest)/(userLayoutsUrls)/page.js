import React from 'react'
import MainSearchDropdown from './MainSearchDropdown'
import CreatePost from './CreatePost'
import { fetchPosts } from '@/actions/fetch-posts'
import FeedCard from '@/components/cards/feed/FeedCard'
// import LoadMoreFeed, { NoMoreFeed } from './LoadMoreFeed'

const Home = async () => {
    const { data: posts } = await fetchPosts(1, '/feeds')

    return (
        <div className="space-y-2">
            <MainSearchDropdown />
            <CreatePost />
            <FeedCard posts={posts} />
            {/* {meta.last_page === 1 && <NoMoreFeed />} */}
            {/* {meta.last_page !== 1 && <LoadMoreFeed />} */}
        </div>
    )
}

export default Home
