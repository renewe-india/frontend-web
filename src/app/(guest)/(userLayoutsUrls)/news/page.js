'use client'

import axios from '@/lib/axios'
import { useEffect, useRef, useState, useCallback } from 'react'
import { SkeletonCard } from '@/components/skeletons/NewsSkeleton'
import Loading from '@/components/ui/Loading'
import NewsCard from './NewsCard'

const News = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [noMoreArticles, setNoMoreArticles] = useState(false)
    const observer = useRef()

    const fetchArticles = useCallback(async () => {
        if (loading || noMoreArticles) return
        setLoading(true)
        try {
            const response = await axios.get(`/news/articles?page=${page}`)
            const newArticles = response.data.data
            setArticles(prevArticles => [...prevArticles, ...newArticles])
            if (newArticles.length === 0) {
                setNoMoreArticles(true)
            } else {
                setPage(prevPage => prevPage + 1)
            }
        } catch (error) {
            //console.error('Error fetching articles:', error)
        } finally {
            setLoading(false)
        }
    }, [loading, noMoreArticles, page])

    const lastArticleElementRef = useCallback(
        node => {
            if (loading || noMoreArticles) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(
                entries => {
                    if (
                        entries[0].isIntersecting &&
                        !loading &&
                        !noMoreArticles
                    ) {
                        fetchArticles()
                    }
                },
                {
                    rootMargin: '100px',
                },
            )
            if (node) observer.current.observe(node)
        },
        [loading, noMoreArticles, fetchArticles],
    )

    useEffect(() => {
        fetchArticles()
    }, [fetchArticles])

    return (
        <div
            id="main-content"
            className="col-span-12 lg:col-span-8 xl:col-span-6">
            <div className="space-y-2">
                {loading && !articles.length ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    articles.map((article, index) => (
                        <NewsCard
                            key={article.id}
                            article={article}
                            lastArticleElementRef={
                                index === articles.length - 1
                                    ? lastArticleElementRef
                                    : null
                            }
                        />
                    ))
                )}
                {loading && articles.length > 0 && <Loading />}
                {noMoreArticles && !loading && !articles.length && (
                    <p className="text-xl text-gray-500">
                        No more articles available.
                    </p>
                )}
            </div>
        </div>
    )
}

export default News
