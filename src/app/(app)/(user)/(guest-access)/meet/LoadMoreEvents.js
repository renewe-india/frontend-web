'use client'

import { getPaginatedData } from '@/actions/get-paginated-data'
import EventCard from '@/components/cards/EventCard'
import Spinner from '@/components/ui/Spinner'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function LoadMoreEvents() {
    const [events, setEvents] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState()
    const { ref, inView } = useInView()

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const loadMoreEvents = async () => {
        await delay(500)
        const nextPage = page + 1
        const { data: newEvents, meta } =
            (await getPaginatedData(nextPage, '/meet/events')) ?? []

        setEvents(prevEvents => [...prevEvents, ...newEvents])
        setLastPage(meta.last_page)
        setPage(nextPage)
    }

    useEffect(() => {
        if (inView || page < lastPage) {
            loadMoreEvents()
        }
    }, [inView])

    return (
        <>
            <EventCard events={events} />
            {page !== lastPage && (
                <div
                    className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
                    ref={ref}>
                    <Spinner />
                </div>
            )}
            {lastPage === page && <NoMoreEvents />}
        </>
    )
}

export function NoMoreEvents() {
    return (
        <div className="card bg-base-200 rounded-lg p-5">
            <div className="flex flex-col items-center justify-center text-center">
                <img
                    src="/notFound/event-not-found.svg"
                    alt="No results found"
                    width={400}
                    height={400}
                />
                <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl">
                    Hold tight! More events are coming soon!
                </div>
            </div>
        </div>
    )
}
