import React from 'react'
import Image from '../Image'
import { Calendar, MapPin } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

function EventCard({ events }) {
    const formatDate = dateString => {
        const date = new Date(dateString)
        return `${date.getDate()} ${date.toLocaleString('default', {
            month: 'short',
        })}, ${date.getFullYear()}`
    }
    return (
        <>
            {events ? (
                events.map((event, idx) => (
                    <div className="card bg-base-200 rounded-lg p-5" key={idx}>
                        <div>
                            <Link
                                href={`/meet/${event.slug}`}
                                className="space-y-2">
                                <div className="flex items-start">
                                    <div className="flex flex-col gap-1 flex-grow">
                                        <div className="font-bold">
                                            {event.title || 'Event Title'}
                                        </div>
                                        <div className="inline-flex items-center gap-1">
                                            <Calendar size={24} />
                                            <div>
                                                {formatDate(event.start_at)} -{' '}
                                                {formatDate(event.end_at)}
                                            </div>
                                        </div>
                                        {event.location && (
                                            <div className="inline-flex items-center gap-1">
                                                <MapPin size={24} />
                                                <div>{event.location}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="avatar">
                                            <div className="w-7 rounded-full !rounded !h-24 !w-24">
                                                <Image
                                                    data={event.logo}
                                                    alt="event logo"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="badge">
                                        {event.type || 'Event Type'}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {event.short_description ||
                                        'No description available.'}
                                </p>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-xl font-bold">No Events available !! </div>
            )}
        </>
    )
}

export default EventCard
