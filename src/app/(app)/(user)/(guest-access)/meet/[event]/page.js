import { getData } from '@/actions/getData'
import PostActions from '@/components/cards/card-actions/PostActions'
import Image from '@/components/Image'
import OrganizationLogo from '@/components/organization/OrganizationLogo'
import MainCard from '@/components/ui/MainCard'
import { ConditionalRender } from '@/lib/utils'
import { formatDate } from '@/lib/utils/FormatDate'
import {
    Calendar,
    Clock,
    MapPin,
    MapPinArea,
} from '@phosphor-icons/react/dist/ssr'
import React from 'react'

const page = async ({ params }) => {
    const { data: event } = await getData(`/meet/events/${params.event}`)

    return (
        <>
            <ConditionalRender condition={event !== null}>
                <MainCard>
                    {/* Card Header */}
                    <div className="flex items-start mb-2">
                        <div className="flex flex-col gap-1 flex-grow">
                            <div className="text-2xl sm:text-3xl font-bold">
                                {event?.title || 'Event Title'}
                            </div>
                            <ConditionalRender condition={event?.edition}>
                                <h3 className="inline-flex font-semibold text-lg">
                                    Edition - {event?.edition}
                                </h3>
                            </ConditionalRender>
                            <div className="mt-4 inline-flex text-sm sm:text-base font-semibold items-center gap-1 ">
                                <Calendar size={24} />
                                <div>
                                    {formatDate(event?.start_at)} -{' '}
                                    {formatDate(event?.end_at)}
                                </div>
                            </div>
                            <ConditionalRender condition={event?.location}>
                                <div className="inline-flex items-center gap-1">
                                    <MapPin size={24} />
                                    <div>{event?.location}</div>
                                </div>
                            </ConditionalRender>
                        </div>
                        <div className="flex items-end gap-2">
                            <OrganizationLogo
                                LogoUrl={event?.logo}
                                alt="event logo"
                                size="lg"
                            />
                        </div>
                    </div>
                    <ConditionalRender condition={event?.type}>
                        <div className="badge">{event?.type}</div>
                    </ConditionalRender>
                    <figure className="my-5 relative h-64 md:h-96">
                        <Image
                            // data={event?.backdrop?.url}
                            src={'/images/backdrop.svg'}
                            alt="Event backdrop"
                            className="w-full h-full object-cover"
                        />
                    </figure>
                    <ConditionalRender condition={event?.short_description}>
                        <div>
                            <div className=" text-xl sm:text-2xl font-bold">
                                About
                            </div>
                            <p className="text-base sm:text-lg text-gray-500">
                                {event?.short_description}
                            </p>
                        </div>
                    </ConditionalRender>
                    <div className="my-4 space-y-2">
                        <h3 className="font-bold text-xl sm:text-2xl">
                            Venues & Schedule
                        </h3>
                        <div className="divide-y divide-base-300">
                            {event?.venues?.map(venue => (
                                <div
                                    key={venue.id}
                                    className="py-2 first:pt-2 last:pb-0">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <MapPinArea className="w-4 h-4 text-primary flex-shrink-0" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-base truncate">
                                                {venue.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-2 text-sm text-base-content/60">
                                                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                                <div className="flex flex-wrap gap-x-1">
                                                    <span>
                                                        {formatDate(
                                                            venue.start_at,
                                                        )}
                                                    </span>
                                                    <span>-</span>
                                                    <span>
                                                        {formatDate(
                                                            venue.end_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <PostActions />
                </MainCard>
            </ConditionalRender>
            <ConditionalRender condition={event === null}>
                <MainCard>
                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src="/errorCode/404.svg"
                            alt="No results found"
                            width={400}
                            height={400}
                        />
                        <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                            Hold tight! This Event is not published yet!
                        </div>
                    </div>
                </MainCard>
            </ConditionalRender>
        </>
    )
}

export default page
