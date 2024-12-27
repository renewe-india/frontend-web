'use client'

import { getPaginatedData } from '@/actions/get-paginated-data'
import { NewsCardWithActions } from '@/components/cards/news/NewsCard'
import MainCard from '@/components/ui/MainCard'
import Spinner from '@/components/ui/Spinner'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function LoadMoreNews() {
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState()
    const { ref, inView } = useInView()

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const loadMoreArticles = async () => {
        await delay(500)
        const nextPage = page + 1
        const { data: newArticles, meta } =
            (await getPaginatedData(nextPage, '/news/articles')) ?? []

        setArticles(prevArticles => [...prevArticles, ...newArticles])
        setLastPage(meta.last_page)
        setPage(nextPage)
    }

    useEffect(() => {
        if (inView || page < lastPage) {
            loadMoreArticles()
        }
    }, [inView])

    return (
        <>
            {articles.map((article, index) => (
                <NewsCardWithActions
                    key={index}
                    article={article}
                    sharedAt={article?.published_at}
                />
            ))}
            {page !== lastPage && (
                <div
                    className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
                    ref={ref}>
                    <Spinner />
                </div>
            )}
            {lastPage === page && <NoMoreArticles />}
        </>
    )
}
export function NoMoreArticles() {
    return (
        <MainCard>
            <div className="flex flex-col items-center justify-center text-center">
                <img
                    src="/notFound/new-article-not-found.svg"
                    alt="No results found"
                    width={400}
                    height={400}
                />
                <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                    Hold tight! Our team is busy gathering more articles just
                    for you!
                </div>
            </div>
        </MainCard>
    )
}
