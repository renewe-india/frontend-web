'use client'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Navigation from '@/app/Navigation'
import Loading from '@/components/Loading'
import LeftSidebar from './(app)/(user)/LeftSidebar'
import RightSidebar from './(app)/(user)/RightSidebar'
import SearchComponent from '@/components/SearchPanel'

const Home = () => {
    const router = useRouter()
    const { user: authUser } = useAuth({ middleware: 'auth' })
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user')
                setUser(response.data)
                setIsLoading(false)
            } catch (error) {
                router.push('/login')
            }
        }

        if (!authUser) {
            fetchUserData()
        } else {
            setUser(authUser)
            setIsLoading(false)
        }
    }, [authUser, router])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {(!user || isLoading) && <Loading />}
            {user && !isLoading && (
                <>
                    <Navigation user={user} />
                    <div className="container mx-auto  my-auto py-16">
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-2">
                            <LeftSidebar />
                            <div
                                id="main-content"
                                className="w-full min-h-screen lg:col-span-8 xl:col-span-6">
                                <SearchComponent />
                            </div>
                            <RightSidebar />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Home
