import React from 'react'
import PasswordForm from './PasswordForm'

export const metadata = {
    title: 'Change Your password',
}

const page = () => {
    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5 ">
                <div className="mb-2">
                    <h2 className="text-2xl font-bold">Change your Password</h2>
                    <div className="divider my-0" />
                </div>

                <PasswordForm />
            </div>
        </>
    )
}

export default page
