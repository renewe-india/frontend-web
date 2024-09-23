'use client'
import React, { useEffect, useState } from 'react'
import PhoneNumberInput from './PhoneNumberInput'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import EmailInput from './EmailInput'
import SocialMediaInput from './SocialMediaInput'
import { useOrganization } from '@/context/OrganizationContext'
import axios from '@/lib/axios'

function ContactSettings({ countryCodes }) {
    const org = useOrganization()
    const [phoneNumbers, setPhoneNumbers] = useState([])
    const [emails, setEmails] = useState([])
    const [socialLinks, setSocialLinks] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchContactInfo = async () => {
        try {
            setLoading(true)
            const response = await axios.get(
                `/organizations/${org.name}/contacts`,
            )
            const contactData = response.data.data
            const phones = contactData.filter(
                contact => contact.type === 'mobile',
            )
            const emails = contactData.filter(
                contact => contact.type === 'email',
            )
            const socialLinks = contactData.filter(
                contact => contact.type === 'social-media',
            )

            setPhoneNumbers(phones)
            setEmails(emails)
            setSocialLinks(socialLinks)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContactInfo()
    }, [org])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="card w-full p-6 bg-base-100 shadow-xl mt-2">
                <div className="text-xl font-semibold ">Contact</div>
                <div className="divider my-1" />

                <div className="h-full w-full ">
                    <TitleCard title="Phone Numbers" topMargin={'mt-2'}>
                        <PhoneNumberInput
                            phoneNumbers={phoneNumbers}
                            countryCodes={countryCodes}
                            org={org.name}
                            fetchContact={fetchContactInfo}
                        />
                    </TitleCard>
                    <TitleCard title="Emails" topMargin={'mt-2'}>
                        <EmailInput
                            emails={emails}
                            org={org.name}
                            fetchContact={fetchContactInfo}
                        />
                    </TitleCard>
                    <TitleCard title="Social Media" topMargin={'mt-2'}>
                        <SocialMediaInput
                            socialLinks={socialLinks}
                            updateSocialLinks={setSocialLinks}
                            org={org.name}
                        />
                    </TitleCard>{' '}
                </div>
            </div>
        </div>
    )
}

export default ContactSettings
