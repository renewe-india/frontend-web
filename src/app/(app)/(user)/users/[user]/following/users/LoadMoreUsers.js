'use client'

import { getPaginatedData } from '@/actions/get-paginated-data'
import UserCard from '@/components/cards/UserCard'
import Spinner from '@/components/ui/Spinner'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { cn, ConditionalRender } from '@/lib/utils'

export default function LoadMoreUser({ username }) {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState()
    const { ref, inView } = useInView()

    const loadMoreUsers = async () => {
        const nextPage = page + 1
        const { data: newUsers, meta } =
            (await getPaginatedData(
                nextPage,
                `users/${username}/following/users`,
            )) ?? []

        setUsers(users => [...users, ...newUsers])
        setLastPage(meta.last_page)
        setPage(nextPage)
    }

    useEffect(() => {
        if (inView || page < lastPage) {
            loadMoreUsers()
        }
    }, [inView])

    return (
        <div className="mt-2 space-y-2">
            {users.map(user => (
                <UserCard key={user?.username} user={user} />
            ))}
            <ConditionalRender condition={page !== lastPage}>
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
