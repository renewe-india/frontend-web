import Loading from '@/components/ui/Loading'
import dynamic from 'next/dynamic'
import TopNavbar from '@/components/navigation/TopNavbar'
import NotificationPanel from './NotificationPanel'

const SidePanel = dynamic(() => import('@/components/navigation/SidePanel'), {
    loading: () => <Loading />,
    ssr: false,
})
const BottomNavbar = dynamic(
    () => import('@/components/navigation/BottomNavbar'),
    {
        loading: () => <Loading />,
        ssr: false,
    },
)
const SearchBar = dynamic(() => import('@/components/navigation/SearchBar'), {
    loading: () => <Loading />,
    ssr: false,
})

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
