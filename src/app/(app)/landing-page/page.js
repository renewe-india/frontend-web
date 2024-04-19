'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '@/app/(app)/Loading'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <>
            <main />
        </>
    )
}

export default Dashboard
