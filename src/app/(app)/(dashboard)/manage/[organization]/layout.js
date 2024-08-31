'use client'

import useSWR from 'swr'
import { useMemo } from 'react'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/Loading'
import PageContent from '@/components/dashboard/PageContent'
import LeftSidebar from '@/components/dashboard/LeftSidebar'
import { OrganizationContext } from '@/context/OrganizationContext'
import { ToastContainer } from 'react-toastify'
import { ToastProvider } from '@/context/ToastContext'

const fetcher = url => axios.get(url).then(res => res.data.data)

const AdminLayout = ({ children, params }) => {
    const organizationName = params.organization
    const { user } = useAuth({ middleware: 'auth' })

    const { data: organizationData, error } = useSWR(
        user ? `/api/organizations/${organizationName}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000, // Cache data for 1 minute
        },
    )

    const isLoading = !user || (!organizationData && !error)

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

    if (isLoading) {
        return <Loading />
    }

    return (
        <OrganizationContext.Provider value={organizationData}>
            <ToastProvider>
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
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </ToastProvider>
        </OrganizationContext.Provider>
    )
}

export default AdminLayout
