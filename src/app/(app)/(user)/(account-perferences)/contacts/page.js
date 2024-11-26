'use client'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import PhoneNumberUpdateForm from './PhoneNumberUpdateForm'
import EmailUpdateForm from './EmailUpdateForm'
import Heading from '@/components/ui/Heading'

export default function ContactEdit() {
    const { user } = useAuth({ middleware: 'auth' })
    const [phoneNumbers, setPhoneNumbers] = useState([])
    const [emails, setEmails] = useState([])
    const [loading, setLoading] = useState(true)
    const [countryCodes, setCountryCodes] = useState([])

    const fetchContactInfo = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/users/${user.username}/contacts`)
            const contactData = response.data.data
            const phones = contactData.filter(
                contact => contact.type === 'mobile',
            )
            const emails = contactData.filter(
                contact => contact.type === 'email',
            )

            setPhoneNumbers(phones)
            setEmails(emails)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const country_code = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/address/countries/isd-codes')
            setCountryCodes(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        country_code()
        fetchContactInfo()
    }, [user])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Heading title={'Update Contact Information'}>
            <PhoneNumberUpdateForm
                phoneNumbers={phoneNumbers}
                fetchContact={fetchContactInfo}
                countryCodes={countryCodes}
            />
            <EmailUpdateForm emails={emails} fetchContact={fetchContactInfo} />
        </Heading>
    )
}
