'use client'

import useSWR from 'swr'
import { useEffect } from 'react'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/ui/Loading'
import { OrganizationContext } from '@/context/OrganizationContext'
import { ToastContainer } from 'react-toastify'
import { ToastProvider } from '@/context/ToastContext'
import { useRouter } from 'next/navigation'

const fetcher = url => axios.get(url).then(res => res.data.data)

const DashBoardLayout = ({ children, params }) => {
    const router = useRouter()
    const organizationName = params.organization
    const { user } = useAuth({ middleware: 'auth' })

    const { data: organizationData, error } = useSWR(
        user ? `/organizations/${organizationName}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
        },
    )

    const isLoading = !user || (!organizationData && !error)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await axios.get('/user')
            } catch (error) {
                router.push('/login')
            }
        }

        if (!user) {
            fetchUserData()
        }
    }, [user])

    if (isLoading) {
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
