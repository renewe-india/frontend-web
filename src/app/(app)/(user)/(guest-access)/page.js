import React from 'react'
import MainSearchDropdown from './MainSearchDropdown'
import FeedCards from '@/components/cards/feed/FeedCards'
import LoadMoreFeed, { NoMoreFeed } from './LoadMoreFeed'
import { getPaginatedData } from '@/actions/get-paginated-data'
import { ConditionalRender } from '@/lib/utils'

export const metadata = {
    title: 'Feed',
    description:
        'RenewE is a platform that allows you to share your thoughts, ideas, and opinions with the world. Join us today and start sharing!',
}

const Home = async () => {
    const { data: posts, meta } = await getPaginatedData(1, '/feed/feeds')

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
                <ConditionalRender condition={meta.last_page === 1}>
                    <NoMoreFeed />
                </ConditionalRender>
                <ConditionalRender condition={meta.last_page !== 1}>
                    <LoadMoreFeed />
                </ConditionalRender>
            </div>
        </div>
    )
}

export default Home
