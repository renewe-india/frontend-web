'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/Navigation'
import Loading from '@/components/Loading'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

const AppLayout = ({ children }) => {
    const { user } = useAuth({
        middleware: 'auth',
    })

    if (!user) {
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
                        className="w-full min-h-screen lg:col-span-8 xl:col-span-6">
                        {children}
                    </div>
                    <div className="hidden lg:block lg:col-span-2 xl:col-span-3">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppLayout
