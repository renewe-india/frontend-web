import Navigation from '@/components/navigation/Navigation'
import dynamic from 'next/dynamic'
import { UserProvider } from '@/context/UserContext'
import GlobalCompactFooter from '@/components/ui/GlobalCompactFooter'
import { Suspense } from 'react'
import PopoverWrapper from '@/context/PopOverWrapper'
const LeftSidebar = dynamic(() => import('@/app/(app)/(user)/LeftSidebar'))
const RightSidebar = dynamic(() => import('@/app/(app)/(user)/RightSidebar'))

export default function AppLayout({ children }) {
    return (
        <UserProvider>
            <Navigation />
            <Suspense fallback={null}>
                <PopoverWrapper />
            </Suspense>
            <div className="container mx-auto my-auto py-12 sm:py-16">
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-2 px-2">
                    <div className="lg:col-span-4 xl:col-span-3">
                        <LeftSidebar />
                    </div>

                    <div
                        id="main-content"
                        className="w-full min-h-screen lg:col-span-8 xl:col-span-6">
                        {children}
                    </div>

                    <div className="xl:col-span-3">
                        <RightSidebar />
                        <div className="hidden xl:block sticky top-16 z-10">
                            <GlobalCompactFooter />
                        </div>
                    </div>
                </div>
            </div>
        </UserProvider>
    )
}
