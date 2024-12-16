import dynamic from 'next/dynamic'
import TopNavbar from '@/components/navigation/TopNavbar'
import NotificationPanel from './NotificationPanel'

const SidePanel = dynamic(() => import('@/components/navigation/SidePanel'))
const BottomNavbar = dynamic(() =>
    import('@/components/navigation/BottomNavbar'),
)
const SearchBar = dynamic(() => import('@/components/navigation/SearchBar'))

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
