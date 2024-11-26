import React from 'react'
import dynamic from 'next/dynamic'
import Heading from '@/components/ui/Heading'

export const metadata = {
    title: 'Verification',
}
const VerificationForm = dynamic(() => import('./VerificationForm'))

const page = () => {
    return (
        <Heading title={'Verification'}>
            <VerificationForm />
        </Heading>
    )
}

export default page
