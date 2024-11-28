'use client'
import React, { useEffect, useState } from 'react'
import PhoneNumberInput from './PhoneNumberInput'
import EmailInput from './EmailInput'
import SocialMediaInput from './SocialMediaInput'
import { useOrganization } from '@/context/OrganizationContext'
import axios from '@/lib/axios'
import Loading from '@/components/ui/Loading'

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
        return <Loading />
    }

    return (
        <div>
            <div className="card w-full p-6 bg-base-100 shadow-xl mt-2">
                <div className="text-xl font-semibold ">Contact</div>
                <div className="divider my-1" />

                <div className="h-full w-full ">
                    <PhoneNumberInput
                        phoneNumbers={phoneNumbers}
                        countryCodes={countryCodes}
                        org={org.name}
                        fetchContact={fetchContactInfo}
                    />
                    <EmailInput
                        emails={emails}
                        org={org.name}
                        fetchContact={fetchContactInfo}
                    />

                    <SocialMediaInput
                        socialLinks={socialLinks}
                        updateSocialLinks={setSocialLinks}
                        org={org.name}
                    />
                </div>
            </div>
        </div>
    )
}

export default ContactSettings
