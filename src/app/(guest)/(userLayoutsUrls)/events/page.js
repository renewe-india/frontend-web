'use client'

import EventCard from '@/components/cards/EventCard'
import Loading from '@/components/ui/Loading'
import axios from '@/lib/axios'
import React, { useEffect, useState } from 'react'

const Events = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/events')
                setEvents(response.data.data || [])
            } catch (error) {
                setEvents([])
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            {events.length === 0 ? (
                <div className="card bg-base-200 rounded-lg p-5">
                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src="/notFound/event-not-found.svg"
                            alt="No results found"
                            width={400}
                            height={400}
                        />
                        <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                            No events available at the moment. Stay tuned for
                            updates!
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-2">
                    {events.map((event, id) => (
                        <EventCard key={id} event={event} />
                    ))}
                </div>
            )}
        </>
    )
}

export default Events
