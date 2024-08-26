'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/Navigation'
import Loading from '@/components/Loading'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import LeftSidebar from '../(user)/LeftSidebar'

const AppLayout = ({ children }) => {
    const { user: authUser } = useAuth({
        middleware: 'auth',
    })
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await axios.get('/api/user')

                setIsLoading(false)
            } catch (error) {
                router.push('/login')
            }
        }

        if (!authUser) {
            fetchUserData()
        } else {
            setIsLoading(false)
        }
    }, [authUser, router])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Navigation />
            <div className="container mx-auto py-16">
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-2">
                    <div className="hidden lg:block lg:col-span-2 xl:col-span-3">
                        <div className="sticky top-16">
                            <LeftSidebar />
                        </div>
                    </div>
                    <div
                        id="main-content"
                        className="w-full min-h-screen lg:col-span-10 xl:col-span-9">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppLayout