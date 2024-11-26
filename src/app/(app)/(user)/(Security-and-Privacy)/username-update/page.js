import React from 'react'
import UsernameForm from './UsernameForm'
import Heading from '@/components/ui/Heading'

export const metadata = {
    title: 'Change Your Username',
}

const page = () => {
    return (
        <Heading title={'Change your username'}>
            <UsernameForm />
        </Heading>
    )
}

export default page
