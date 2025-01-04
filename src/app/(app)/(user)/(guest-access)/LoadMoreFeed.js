'use client'

import { getPaginatedData } from '@/actions/get-paginated-data'
import FeedCards from '@/components/cards/feed/FeedCards'
import MainCard from '@/components/ui/MainCard'
import Spinner from '@/components/ui/Spinner'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ConditionalRender } from '@/lib/utils'

export default function LoadMoreFeed() {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState()
    const { ref, inView } = useInView()

    const loadMorePosts = async () => {
        const nextPage = page + 1
        const { data: newPosts, meta } =
            (await getPaginatedData(nextPage, '/feeds')) ?? []

        setPosts(prevPosts => [...prevPosts, ...newPosts])
        setLastPage(meta.last_page)
        setPage(nextPage)
    }

    useEffect(() => {
        if (inView || page < lastPage) {
            loadMorePosts()
        }
    }, [inView])

    return (
        <div className="mt-2">
            <FeedCards posts={posts} />
            <ConditionalRender condition={page !== lastPage}>
                <div
                    className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
                    ref={ref}>
                    <Spinner />
                </div>
            </ConditionalRender>
            <ConditionalRender condition={lastPage === page}>
                <div className="my-2">
                    <NoMoreFeed />
                </div>
            </ConditionalRender>
        </div>
    )
}

export function NoMoreFeed() {
    return (
        <MainCard>
            <div className="flex flex-col items-center justify-center text-center">
                <img
                    src="/notFound/feed-not-found.svg"
                    alt="No results found"
                    width={400}
                    height={400}
                />
                <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                    Hold tight! Our team is busy gathering more Posts just for
                    you!
                </div>
            </div>
        </MainCard>
    )
}
