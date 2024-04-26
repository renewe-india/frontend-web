'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/Navigation'
import Loading from '@/components/Loading'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <>
            <Navigation />
            <div className="container mx-auto py-16">
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-2">
                    <LeftSidebar />
                    <div
                        id="main-content"
                        className="col-span-12 lg:col-span-8 xl:col-span-6">
                        {children}
                    </div>
                    <RightSidebar />
                </div>
            </div>
        </>
    )
}

export default AppLayout
