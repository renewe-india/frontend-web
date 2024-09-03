import Navigation from '@/app/Navigation'
import SearchComponent from '@/components/SearchPanel'
import Loading from '@/components/Loading'
import dynamic from 'next/dynamic'

const LeftSidebar = dynamic(() => import('./(app)/(user)/LeftSidebar'), {
    loading: () => <Loading />,
})
const RightSidebar = dynamic(() => import('./(app)/(user)/RightSidebar'), {
    loading: () => <Loading />,
})

const Home = () => {
    return (
        <>
            <Navigation />
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
    )
}

export default Home
