'use client'
import React, { useState } from 'react'
import PhoneNumberInput from './PhoneNumberInput'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import EmailInput from './EmailInput'
import SocialMediaInput from './SocialMediaInput'
import { ToastContainer, toast } from 'react-toastify'

function ContactSettings({ countryCodes }) {
    const [phoneNumbers, setPhoneNumbers] = useState([
        { number: '123-456-7890', verified: true },
        { number: '098-765-4321', verified: false },
    ])
    const [emails, setEmails] = useState([
        { email: 'example@example.com', verified: true },
        { email: 'test@test.com', verified: false },
    ])
    const [socialLinks, setSocialLinks] = useState({
        facebook: 'https://facebook.com/example',
        twitter: 'https://twitter.com/example',
    })

    const updateContactInfo = async () => {
        try {
            // Send PATCH request to update contact information
            // Example: await axios.patch('/api/contacts', { phoneNumbers, emails, socialLinks });
            toast.success('Contact information updated successfully!')
        } catch (error) {
            toast.error('Error updating contact information.')
        }
    }

    return (
        <div>
            <div className="card w-full p-6 bg-base-100 shadow-xl mt-2">
                <div className="text-xl font-semibold ">Contact</div>
                <div className="divider my-1" />
            </div>
            <div className="h-full w-full bg-base-200">
                <TitleCard title="Phone Numbers" topMargin={'mt-2'}>
                    <PhoneNumberInput
                        phoneNumbers={phoneNumbers}
                        updatePhoneNumbers={setPhoneNumbers}
                        countryCodes={countryCodes}
                    />
                </TitleCard>

                <TitleCard title="Emails" topMargin={'mt-2'}>
                    <EmailInput emails={emails} updateEmails={setEmails} />
                </TitleCard>

                <TitleCard title="Social Media" topMargin={'mt-2'}>
                    <SocialMediaInput
                        socialLinks={socialLinks}
                        updateSocialLinks={setSocialLinks}
                    />
                </TitleCard>

                <div className="mt-4">
                    <button
                        className="btn btn-primary float-right"
                        onClick={updateContactInfo}>
                        Update
                    </button>
                </div>
            </div>

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
        </div>
    )
}

export default ContactSettings
