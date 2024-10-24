import Loading from '@/components/ui/Loading'
import Navigation from '@/components/navigation/Navigation'
import dynamic from 'next/dynamic'

const LeftSidebar = dynamic(() => import('@/app/(app)/(user)/LeftSidebar'), {
    loading: () => <Loading />,
})

const AppLayout = ({ children }) => {
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
