'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '@/components/ui/Loading'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation/Navigation'

const LeftSidebar = dynamic(() => import('./LeftSidebar'), {
    loading: () => <Loading />,
})
const RightSidebar = dynamic(() => import('./RightSidebar'), {
    loading: () => <Loading />,
})
const AppLayout = ({ children }) => {
    const { user: authUser } = useAuth({
        middleware: 'auth',
    })
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await axios.get('/user')

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
            <div className="container mx-auto my-auto py-16">
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-2 px-2">
                    {/* Left Sidebar should be sticky on large screens */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        <LeftSidebar />
                    </div>

                    <div
                        id="main-content"
                        className="w-full min-h-screen lg:col-span-8 xl:col-span-6">
                        {children}
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-span-1 xl:col-span-3">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppLayout
