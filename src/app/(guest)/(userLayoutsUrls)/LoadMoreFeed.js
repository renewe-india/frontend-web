'use client'

import { fetchPosts } from '@/actions/fetch-posts'
import FeedCard from '@/components/cards/feed/FeedCard'
import Spinner from '@/components/ui/Spinner'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function LoadMoreFeed() {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState()
    const { ref, inView } = useInView()

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const loadMorePosts = async () => {
        await delay(500)
        const nextPage = page + 1
        const { data: newPosts, meta } =
            (await fetchPosts(nextPage, '/feeds')) ?? []

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
        <>
            <FeedCard posts={posts} />
            {page !== lastPage && (
                <div
                    className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
                    ref={ref}>
                    <Spinner />
                </div>
            )}
            {lastPage === page && <NoMoreFeed />}
        </>
    )
}
export function NoMoreFeed() {
    return (
        <div className="card bg-base-200 rounded-lg p-5">
            <div className="flex flex-col items-center justify-center text-center">
                <img
                    src="/notFound/new-article-not-found.svg"
                    alt="No results found"
                    width={400}
                    height={400}
                />
                <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                    Hold tight! Our team is busy gathering more Posts just for
                    you!
                </div>
            </div>
        </div>
    )
}
