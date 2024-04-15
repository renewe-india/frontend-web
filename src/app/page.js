'use client'

import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'

const Home = () => {
    const { user } = useAuth({ middleware: 'guest' })
    const router = useRouter()
    return <>{user ? router.push('/dashboard') : router.push('/login')}</>
}

export default Home
