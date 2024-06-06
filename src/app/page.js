'use client'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navigation from '@/app/Navigation'
import LeftSidebar from '@/app/(user)/LeftSidebar'
import RightSidebar from '@/app/(user)/RightSidebar'
import Loading from '@/components//Loading'
import Input from '@/components/Input'

const Home = ({ children }) => {
    const { user } = useAuth({ middleware: 'guest' })
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        if (!user && !isLoading) {
            router.push('/login')
        }

        return () => clearTimeout(loadingTimer)
    }, [user, isLoading, router])

    return (
        <>
            {(!user || isLoading) && <Loading />}

            {user && !isLoading && (
                <>
                    <Navigation user={user} />

                    <div className="container mx-auto py-16 ">
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-2">
                            <LeftSidebar />

                            <div
                                id="main-content"
                                className="w-full min-h-screen lg:col-span-8 xl:col-span-6">
                                <Input />
                                {children}
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
