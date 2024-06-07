import SidePanel from '@/components/SidePanel'
import MobileNavigation from '@/components/MobileNavigation'
import NotificationPanel from '@/components/NotificationPanel'
import SearchBar from '@/components/SearchBar'
import DesktopBar from '@/components/DesktopBar'

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
