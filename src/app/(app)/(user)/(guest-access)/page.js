import React from 'react'
import MainSearchDropdown from './MainSearchDropdown'
// import CreatePost from './CreatePost'
import FeedCards from '@/components/cards/feed/FeedCards'
import LoadMoreFeed, { NoMoreFeed } from './LoadMoreFeed'
import { getPaginatedData } from '@/actions/get-paginated-data'

const Home = async () => {
    const { data: posts, meta } = await getPaginatedData(1, '/feeds')
    return (
        <div className="space-y-2">
            <MainSearchDropdown />
            {/* <CreatePost /> */}
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 mx-4 mb-2">
                        <span className="text-xs font-semibold">
                            Latest Posts
                        </span>
                    </div>
                    <div className="flex-1 ml-2">
                        <div className="divider mt-0 mb-2" />
                    </div>
                </div>
                <FeedCards posts={posts} />
                {meta.last_page === 1 && <NoMoreFeed />}
                {meta.last_page !== 1 && <LoadMoreFeed />}
            </div>
        </div>
    )
}

export default Home
