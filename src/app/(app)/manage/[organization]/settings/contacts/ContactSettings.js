'use client'
import React, { useState } from 'react'
import { Plus, SealCheck, SealQuestion } from '@phosphor-icons/react'
import axios from '@/lib/axios'
import { useToast } from '@/context/ToastContext'
import Spinner from '@/components/ui/Spinner'
import SocialMediaInput from './SocialMediaInput'
import DeleteButton from '@/components/ui/DeleteButton'
import VerifyButton from '@/components/ui/VerifyButton'

export default function ContactSettings({
    contactsData,
    countryCodes,
    organization,
}) {
    const [contacts, setContacts] = useState(contactsData)
    const [loading, setLoading] = useState(false)
    const { notifySuccess, notifyError } = useToast()

    const handleAddContact = async (type, data, extraFields = {}) => {
        if (!data) {
            notifyError('Please enter valid data.')
            return
        }

        const newContact = { type, data, ...extraFields }
        try {
            setLoading(true)
            const response = await axios.post(
                `/organizations/${organization}/contacts`,
                newContact,
            )
            setContacts(prev => [...prev, response.data])
            notifySuccess(
                `${
                    type === 'mobile'
                        ? 'Phone number'
                        : type === 'email'
                        ? 'Email'
                        : 'Social media link'
                } added successfully`,
            )
        } catch (error) {
            notifyError(
                error?.response?.data?.message || 'Error adding contact!',
            )
        } finally {
            setLoading(false)
        }
    }

    const sendOtp = async contact => {
        try {
            await axios.post(`/contact/${contact.uuid}/verification/otp/send`)
            notifySuccess('OTP sent successfully!')
        } catch (error) {
            notifyError('Error sending OTP!')
        }
    }

    const handleVerify = async (otp, uuid) => {
        try {
            await axios.post(`/contact/${uuid}/verification/otp/verify`, {
                otp,
                otp_confirmation: otp,
            })
            setContacts(prev =>
                prev.map(contact =>
                    contact.uuid === uuid
                        ? { ...contact, is_verified: true }
                        : contact,
                ),
            )
            notifySuccess('Contact verified successfully!')
        } catch (error) {
            notifyError(
                error?.response?.data?.message || 'Error verifying OTP!',
            )
        }
    }

    const handleDeleteContact = async contact => {
        try {
            await axios.delete(
                `/organizations/${organization}/contacts/${contact.uuid}`,
            )
            setContacts(prev => prev.filter(c => c.uuid !== contact.uuid))
            notifySuccess('Contact deleted successfully')
        } catch (error) {
            notifyError(
                error?.response?.data?.message || 'Error deleting contact!',
            )
        }
    }

    return (
        <div>
            <div className="card w-full p-6 bg-base-100 shadow-xl mt-2">
                <div className="text-xl font-semibold">Contact</div>
                <div className="divider my-1" />

                <div className="h-full w-full">
                    {['mobile', 'email'].map(type => (
                        <ContactList
                            key={type}
                            title={`Manage ${
                                type === 'mobile' ? 'Phone Numbers' : 'Emails'
                            }`}
                            contacts={contacts.filter(
                                contact => contact.type === type,
                            )}
                            onAdd={data =>
                                handleAddContact(type, data.data, {
                                    country_code: data.countryCode,
                                })
                            }
                            onVerify={handleVerify}
                            onDelete={handleDeleteContact}
                            countryCodes={countryCodes}
                            isPhone={type === 'mobile'}
                            loading={loading}
                            sendOtp={sendOtp}
                        />
                    ))}

                    <SocialMediaInput
                        socialLinks={contacts.filter(
                            contact => contact.type === 'social-media',
                        )}
                        updateSocialLinks={updatedLinks =>
                            setContacts(prev => [
                                ...prev.filter(
                                    contact => contact.type !== 'social-media',
                                ),
                                ...updatedLinks,
                            ])
                        }
                    />
                </div>
            </div>
        </div>
    )
}

function ContactList({
    title,
    contacts,
    onAdd,
    onVerify,
    onDelete,
    countryCodes,
    isPhone,
    loading,
    sendOtp,
}) {
    const [newContact, setNewContact] = useState('')
    const [countryCode, setCountryCode] = useState('91')

    const handleAddContact = e => {
        e.preventDefault()
        onAdd({
            data: newContact,
            countryCode: isPhone ? countryCode : undefined,
        })
        setNewContact('')
        setCountryCode('91')
    }

    return (
        <div className="card bg-base-100 rounded-lg mb-5">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <form
                className="flex items-center mb-4"
                onSubmit={handleAddContact}>
                {isPhone && (
                    <select
                        value={countryCode}
                        onChange={e => setCountryCode(e.target.value)}
                        className="input input-bordered w-2/5 lg:w-1/4 mr-2">
                        {countryCodes.map(code => (
                            <option key={code.code} value={code.code}>
                                +{code.code} : {code.country}
                            </option>
                        ))}
                    </select>
                )}
                <input
                    type={isPhone ? 'number' : 'email'}
                    value={newContact}
                    onChange={e => setNewContact(e.target.value)}
                    placeholder={`Add new ${
                        isPhone ? 'phone number' : 'email'
                    }`}
                    min={'0'}
                    className="input input-bordered w-3/5 lg:w-3/4 mr-2"
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}>
                    {loading ? (
                        <Spinner spinColor="text-neutral" />
                    ) : (
                        <Plus className="w-5 h-5" weight="bold" />
                    )}
                </button>
            </form>
            <ul>
                {contacts.map((contact, index) => (
                    <li
                        key={index}
                        className="flex flex-col lg:flex-row items-left lg:items-center gap-3 justify-between bg-base-200 mb-2 p-2 border border-gray-600 rounded">
                        <div className="flex items-center">
                            {contact.is_otp_verified ? (
                                <SealCheck className="w-8 h-8 text-green-600 mr-2" />
                            ) : (
                                <SealQuestion className="w-8 h-8 mr-2" />
                            )}
                            {isPhone
                                ? `+${contact.country_code}-${contact.data}`
                                : contact.data}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            {!contact.is_verified && (
                                <VerifyButton
                                    style="text-success hover:bg-success hover:text-white font-bold shadow-sm shadow-green-600"
                                    itemName={
                                        isPhone
                                            ? `+${contact.country_code}-${contact.data}`
                                            : contact.data
                                    }
                                    sendOtp={async () => await sendOtp(contact)}
                                    methodType={
                                        isPhone ? 'Phone Number' : 'Email'
                                    }
                                    onVerify={otp =>
                                        onVerify(otp, contact.uuid)
                                    }
                                />
                            )}
                            <DeleteButton
                                style="text-red-600 hover:bg-red-600 hover:text-white flex items-center mr-2 shadow-sm shadow-red-600 font-bold"
                                itemName={
                                    isPhone
                                        ? `+${contact.country_code}-${contact.data}`
                                        : contact.data
                                }
                                onDelete={() => onDelete(contact)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
