import React from 'react'
import dynamic from 'next/dynamic'
import MainCard from '@/components/ui/MainCard'

export const metadata = {
    title: 'Verification',
}
const VerificationForm = dynamic(() => import('./VerificationForm'))

const page = () => {
    return (
        <MainCard title={'Verification'}>
            <VerificationForm />
        </MainCard>
    )
}

export default page
