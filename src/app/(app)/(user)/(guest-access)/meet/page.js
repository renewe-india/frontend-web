import EventCard from '@/components/cards/EventCard'
import LoadMoreEvents, { NoMoreEvents } from './LoadMoreEvents'
import { getPaginatedData } from '@/actions/get-paginated-data'
export const metadata = {
    title: 'Meet',
}
const MeetPage = async () => {
    const { data: events, meta } = await getPaginatedData(1, '/meet/events')

    return (
        <div className="space-y-5">
            <EventCard events={events} />
            {meta.last_page === 1 && <NoMoreEvents />}
            {meta.last_page !== 1 && <LoadMoreEvents />}
        </div>
    )
}

export default MeetPage
