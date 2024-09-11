import React from 'react'
import UsernameForm from './UsernameForm'

export const metadata = {
    title: 'Change Your Username',
}

const page = () => {
    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5 ">
                <div className="mb-2">
                    <h2 className="text-2xl font-bold">Change your username</h2>
                    <div className="divider my-0" />
                </div>

                <UsernameForm />
            </div>
        </>
    )
}

export default page
