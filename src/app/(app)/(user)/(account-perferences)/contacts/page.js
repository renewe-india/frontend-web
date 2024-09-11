import React from 'react'
import dynamic from 'next/dynamic'

export const metadata = {
    title: 'Contact update',
}
const ContactForm = dynamic(() => import('./ContactForm'), {
    loading: () => <p>Loading...</p>,
})

const ProfileEdit = () => {
    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5 ">
                <div className="mb-2">
                    <h2 className="text-2xl font-bold">Contacts</h2>
                    <div className="divider my-0" />
                </div>
                <ContactForm />
            </div>
        </>
    )
}

export default ProfileEdit
