import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import Loading from '../Loading'
import Header from './Header'

const Page404 = dynamic(() => import('@/app/not-found'), { ssr: false })

function PageContent({ children, organizationData }) {
    const mainContentRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        mainContentRef.current.scroll({
            top: 0,
            behavior: 'smooth',
        })
    }, [])

    return (
        <div className="drawer-content flex flex-col">
            <Header org={organizationData} />
            <main
                className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6 bg-base-200"
                ref={mainContentRef}>
                <Suspense
                    fallback={<Loading onLoad={() => setIsLoading(true)} />}
                    onLoaded={() => setIsLoading(false)}>
                    {children}

                    {!isLoading && <Page404 />}
                </Suspense>
                <div className="h-16" />
            </main>
        </div>
    )
}

export default PageContent