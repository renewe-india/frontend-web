import dynamic from 'next/dynamic'
import TopNavbar from '@/components/navigation/TopNavbar'
import NotificationPanel from './NotificationPanel'

const SideDrawer = dynamic(() => import('@/components/navigation/SideDrawer'))
const BottomNavbar = dynamic(() =>
    import('@/components/navigation/BottomNavbar'),
)
const SearchDrawer = dynamic(() =>
    import('@/components/navigation/SearchDrawer'),
)

const Navigation = () => {
    return (
        <>
            <SideDrawer />
            <NotificationPanel />
            <SearchDrawer />
            <TopNavbar />
            <BottomNavbar />
        </>
    )
}

export default Navigation
