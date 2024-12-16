'use client'

import useSWR from 'swr'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/ui/Loading'
import { OrganizationContext } from '@/context/OrganizationContext'
import { ToastContainer } from 'react-toastify'
import { ToastProvider } from '@/context/ToastContext'

const fetcher = url => axios.get(url).then(res => res.data.data)

const DashBoardLayout = ({ children, params }) => {
    const organizationName = params.organization
    const { user } = useAuth({ middleware: 'auth' })

    const { data: organizationData, isLoading } = useSWR(
        user ? `/organizations/${organizationName}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 60000,
        },
    )

    if (isLoading || !organizationData) {
        return <Loading />
    }
    return (
        <OrganizationContext.Provider value={organizationData}>
            <ToastProvider>
                {children}
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

export default DashBoardLayout
