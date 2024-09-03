import Loading from '@/components/Loading'
import dynamic from 'next/dynamic'
import DesktopBar from '@/components/DesktopBar'
const SidePanel = dynamic(() => import('@/components/SidePanel'), {
    loading: () => <Loading />,
})
const MobileNavigation = dynamic(
    () => import('@/components/MobileNavigation'),
    {
        loading: () => <Loading />,
    },
)
const SearchBar = dynamic(() => import('@/components/SearchBar'), {
    loading: () => <Loading />,
})
const NotificationPanel = dynamic(
    () => import('@/components/NotificationPanel'),
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
            <DesktopBar />
            <MobileNavigation />
        </>
    )
}

export default Navigation
