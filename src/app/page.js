'use client'

import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
    const { user } = useAuth({ middleware: 'guest' })
    const router = useRouter()
    useEffect(() => {
        if (user) {
            router.push('/landing-page')
        } else {
            router.push('/login')
        }
    }, [user, router])

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
                Loading...
            </div>
        </>
    )
}

export default Home
