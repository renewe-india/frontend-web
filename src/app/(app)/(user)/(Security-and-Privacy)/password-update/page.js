import React from 'react'
import PasswordForm from './PasswordForm'
import Heading from '@/components/ui/Heading'

export const metadata = {
    title: 'Change Your password',
}

const page = () => {
    return (
        <Heading title={'Change your Password'}>
            <PasswordForm />
        </Heading>
    )
}

export default page
