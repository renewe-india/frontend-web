'use client'
import PageContent from '@/components/dashboard//SettingComponents/PageContent'
import LeftSidebar from '@/components/dashboard/SettingComponents/LeftSidebar'
import { useOrganization } from '@/context/OrganizationContext'
import { useMemo } from 'react'

const AdminLayout = ({ children }) => {
    const organizationData = useOrganization()
    const memoizedLeftSidebar = useMemo(
        () => <LeftSidebar organizationData={organizationData} />,
        [organizationData],
    )

    const memoizedPageContent = useMemo(
        () => (
            <PageContent organizationData={organizationData}>
                {children}
            </PageContent>
        ),
        [organizationData, children],
    )

    return (
        <div id="main-content" className="w-full min-h-screen">
            <div className="drawer lg:drawer-open">
                <input
                    id="left-sidebar-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                {memoizedPageContent}
                {memoizedLeftSidebar}
            </div>
        </div>
    )
}

export default AdminLayout
