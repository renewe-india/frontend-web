import Loading from '@/components/ui/Loading'
import dynamic from 'next/dynamic'
import TopNavbar from '@/components/navigation/TopNavbar'
const SidePanel = dynamic(() => import('@/components/navigation/SidePanel'), {
    loading: () => <Loading />,
})
const BottomNavbar = dynamic(
    () => import('@/components/navigation/BottomNavbar'),
    {
        loading: () => <Loading />,
    },
)
const SearchBar = dynamic(() => import('@/components/navigation/SearchBar'), {
    loading: () => <Loading />,
})
const NotificationPanel = dynamic(
    () => import('@/components/navigation/NotificationPanel'),
    {
        loading: () => <Loading />,
    },
)
const Navigation = () => {
    return (
        <>
            <SidePanel />
            <NotificationPanel />
            <SearchBar />
            <TopNavbar />
            <BottomNavbar />
        </>
    )
}

export default Navigation
