import EventCard from '@/components/cards/EventCard'
import LoadMoreEvents, { NoMoreEvents } from './LoadMoreEvents'
import { getPaginatedData } from '@/actions/get-paginated-data'
import MainCard from '@/components/ui/MainCard'
import { ConditionalRender } from '@/lib/utils'

export const metadata = {
    title: 'Meet',
}

const MeetPage = async () => {
    const { data: events, meta } = await getPaginatedData(1, '/meet/events')

    return (
        <div className="space-y-2">
            <MainCard title={'Explore Upcoming Meets'} />
            <EventCard events={events} />
            <ConditionalRender condition={meta.last_page === 1}>
                <NoMoreEvents />
            </ConditionalRender>
            <ConditionalRender condition={meta.last_page !== 1}>
                <LoadMoreEvents />
            </ConditionalRender>
        </div>
    )
}

export default MeetPage
