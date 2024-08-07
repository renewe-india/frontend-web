'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/Navigation'
import Loading from '@/components/Loading'
const AdminLayout = ({ children }) => {
    const { user } = useAuth({
        middleware: 'auth',
    })

    if (!user) {
        return <Loading />
    }

    return (
        <>
            <Navigation />
            <div className="container mx-auto py-16">
                <div id="main-content" className="w-full min-h-screen ">
                    {children}
                </div>
            </div>
        </>
    )
}

export default AdminLayout
