'use client'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import PhoneNumberUpdateForm from './PhoneNumberUpdateForm'
import EmailUpdateForm from './EmailUpdateForm'
import MainCard from '@/components/ui/MainCard'
import Loading from '@/components/ui/Loading'
import { useUser } from '@/context/UserContext'
import ErrorDisplay from '@/components/ui/ErrorDisplay'

export default function ContactEdit() {
    const { user } = useUser()
    const [phoneNumbers, setPhoneNumbers] = useState([])
    const [emails, setEmails] = useState([])
    const [loading, setLoading] = useState(true)
    const [countryCodes, setCountryCodes] = useState([])
    const [error, setError] = useState(null)

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
            setError(error?.response?.data?.errors)
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
            setError(error?.response?.data?.errors)
            setLoading(false)
        }
    }

    useEffect(() => {
        country_code()
        fetchContactInfo()
    }, [user])

    const sendOtp = async uuid => {
        try {
            await axios.post(`/contact/${uuid}/verification/otp/send`)
        } catch (error) {
            setError(error?.response?.data?.errors)
        }
    }

    const handleVerify = async (otp, contact) => {
        try {
            await axios.post(
                `/contact/${contact.uuid}/verification/otp/verify`,
                {
                    otp,
                    otp_confirmation: otp,
                },
            )

            if (contact.type === 'mobile') {
                setPhoneNumbers(prev =>
                    prev.map(phone =>
                        phone.uuid === contact.uuid
                            ? {
                                  ...phone,
                                  is_otp_verified: true,
                              }
                            : phone,
                    ),
                )
            } else {
                setEmails(prev =>
                    prev.map(email =>
                        email.uuid === contact.uuid
                            ? {
                                  ...email,
                                  is_otp_verified: true,
                              }
                            : email,
                    ),
                )
            }
        } catch (error) {
            setError(error?.response?.data?.errors)
        }
    }

    const handleDelete = async contact => {
        try {
            await axios.delete(
                `/users/${user.username}/contacts/${contact.uuid}`,
            )
            if (contact.type === 'mobile') {
                setPhoneNumbers(prev =>
                    prev.filter(phone => phone.uuid !== contact.uuid),
                )
            } else {
                setEmails(prev =>
                    prev.filter(email => email.uuid !== contact.uuid),
                )
            }
        } catch (error) {
            setError(error?.response?.data?.errors)
        }
    }

    return (
        <MainCard
            CardClassName="space-y-4"
            title={'Update Contact Information'}>
            {error && (
                <ErrorDisplay message={error} onClose={() => setError(null)} />
            )}
            {loading ? (
                <Loading />
            ) : (
                <>
                    <PhoneNumberUpdateForm
                        phoneNumbers={phoneNumbers}
                        fetchContact={fetchContactInfo}
                        countryCodes={countryCodes}
                        onVerify={handleVerify}
                        handleSendOtp={async uuid => await sendOtp(uuid)}
                        onDeleteRequest={handleDelete}
                    />
                    <EmailUpdateForm
                        emails={emails}
                        fetchContact={fetchContactInfo}
                        onVerify={handleVerify}
                        handleSendOtp={async uuid => await sendOtp(uuid)}
                        onDeleteRequest={handleDelete}
                    />
                </>
            )}
        </MainCard>
    )
}
