import Loading from '@/components/ui/Loading'
import Navigation from '@/components/navigation/Navigation'
import dynamic from 'next/dynamic'

const LeftSidebar = dynamic(() => import('@/app/(app)/(user)/LeftSidebar'), {
    loading: () => <Loading />,
})
const RightSidebar = dynamic(() => import('@/app/(app)/(user)/RightSidebar'), {
    loading: () => <Loading />,
})

const AppLayout = ({ children }) => {
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
