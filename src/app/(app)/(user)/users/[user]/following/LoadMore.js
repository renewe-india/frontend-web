'use client'

import { getPaginatedData } from '@/actions/get-paginated-data'
import Spinner from '@/components/ui/Spinner'
import UserCard from '@/components/cards/UserCard'
import OrganizationCard from '@/components/cards/OrganizationCard'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { cn, ConditionalRender } from '@/lib/utils'

export default function LoadMore({ apiEndpoint, type }) {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(null)
    const { ref, inView } = useInView()

    const loadMoreItems = async () => {
        const nextPage = page + 1
        const { data: newItems, meta } =
            (await getPaginatedData(nextPage, apiEndpoint)) ?? []

        setItems(currentItems => [...currentItems, ...newItems])
        setLastPage(meta?.last_page)
        setPage(nextPage)
    }

    useEffect(() => {
        if (inView && (lastPage === null || page < lastPage)) {
            loadMoreItems()
        }
    }, [inView])

    const renderCard = item => {
        switch (type) {
            case 'user':
                return <UserCard key={item?.username} user={item} />
            case 'organization':
                return <OrganizationCard key={item?.name} org={item} />
            default:
                return null
        }
    }

    return (
        <div className="mt-2 space-y-2">
            {items.map(renderCard)}
            <ConditionalRender condition={lastPage === null || page < lastPage}>
                <div
                    className={cn('flex justify-center items-center p-4', {
                        'col-span-1 sm:col-span-2 md:col-span-3': true,
                    })}
                    ref={ref}>
                    <Spinner />
                </div>
            </ConditionalRender>
        </div>
    )
}
