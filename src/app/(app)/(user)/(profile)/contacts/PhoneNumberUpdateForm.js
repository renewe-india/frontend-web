import axios from '@/lib/axios'
import { Plus, SealCheck, SealQuestion } from '@phosphor-icons/react'
import React, { useState } from 'react'
import { useUser } from '@/context/UserContext'
import InputField from '@/components/ui/InputField'
import Spinner from '@/components/ui/Spinner'
import DeleteButton from '@/components/ui/DeleteButton'
import VerifyButton from '@/components/ui/VerifyButton'
import ErrorDisplay from '@/components/ui/ErrorDisplay'

const PhoneNumberUpdateForm = ({
    phoneNumbers,
    fetchContact,
    countryCodes,
    handleSendOtp,
    onVerify,
    onDeleteRequest,
}) => {
    const { user } = useUser()
    const [formData, setFormData] = useState({
        phoneNumber: '',
        countryCode: '91',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleInputChange = e => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const addPhoneNumber = async e => {
        e.preventDefault()
        setError(null)
        if (formData.phoneNumber) {
            const newPhoneData = {
                type: 'mobile',
                country_code: formData.countryCode,
                data: formData.phoneNumber,
            }

            try {
                setLoading(true)
                await axios.post(
                    `/users/${user.username}/contacts`,
                    newPhoneData,
                )
                setFormData(prev => ({ ...prev, phoneNumber: '' }))
                fetchContact()
            } catch (error) {
                setError(error?.response?.data?.errors)
            } finally {
                setLoading(false)
            }
        }
    }

    const sendOtp = async uuid => {
        await handleSendOtp(uuid)
    }

    const handleDelete = phone => {
        onDeleteRequest(phone)
    }

    return (
        <>
            <h3 className="text-xl font-semibold mb-4">Update Phone Number</h3>
            {error && (
                <ErrorDisplay errors={error} onClose={() => setError(null)} />
            )}
            <form onSubmit={addPhoneNumber} className="flex items-center mb-4">
                <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={e => handleInputChange(e)}
                    className="input input-bordered input-primary w-2/5 lg:w-1/4 mr-2">
                    {countryCodes.map(code => (
                        <option key={code.code} value={code.code}>
                            +{code.code} : {code.country}
                        </option>
                    ))}
                </select>

                <InputField
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter 10 digit mobile number"
                    className="input input-bordered input-primary w-3/5 lg:w-3/4 mr-2"
                    required
                    props={{
                        minLength: '10',
                        maxLength: '10',
                        inputMode: 'numeric',
                    }}
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
                {phoneNumbers.map((phone, index) => (
                    <li
                        key={index}
                        className="flex flex-col lg:flex-row items-left lg:items-center gap-3 bg-base-100 justify-between mb-2 p-2 border border-gray-600 rounded">
                        <div className="flex items-center">
                            {phone.is_verified ? (
                                <SealCheck
                                    className="w-8 h-8 text-green-600 mr-2"
                                    weight="fill"
                                />
                            ) : (
                                <SealQuestion
                                    className="w-8 h-8 mr-2"
                                    weight="fill"
                                />
                            )}
                            +{phone.country_code}-{phone.data}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            {!phone.is_verified && (
                                <VerifyButton
                                    itemName={`+${phone.country_code}-${phone.data}`}
                                    sendOtp={async () =>
                                        await sendOtp(phone.uuid)
                                    }
                                    methodType={'Phone Number'}
                                    onVerify={otp => onVerify(otp, phone)}
                                />
                            )}
                            <DeleteButton
                                itemName={`${phone.country_code}-${phone.data}`}
                                onDelete={() => handleDelete(phone)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default PhoneNumberUpdateForm
