import React, { useState } from 'react'
import { Plus, SealCheck, Trash } from '@phosphor-icons/react'
import VerificationModal from './VerificationModal'

function PhoneNumberInput({ phoneNumbers, updatePhoneNumbers, countryCodes }) {
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentPhone, setCurrentPhone] = useState(null)
    const [countryCode, setCountryCode] = useState('91')

    const addPhoneNumber = () => {
        if (newPhoneNumber) {
            updatePhoneNumbers([
                ...phoneNumbers,
                { number: `${countryCode}-${newPhoneNumber}`, verified: false },
            ])
            setNewPhoneNumber('')
        }
    }
    const toggleVerification = index => {
        const phone = phoneNumbers[index]
        setCurrentPhone(phone)
        sendOtp(phone.number)
    }

    const sendOtp = async () => {
        setIsModalOpen(true)
    }

    const handleVerify = async () => {
        setIsModalOpen(false)
    }

    const deletePhoneNumber = index => {
        const updatedNumbers = phoneNumbers.filter((_, i) => i !== index)
        updatePhoneNumbers(updatedNumbers)
    }

    return (
        <div>
            <div className="flex items-center mb-4">
                <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    className="input input-bordered w-2/5 lg:w-1/4   mr-2">
                    {countryCodes.map(code => (
                        <option key={code.code} value={code.code}>
                            +{code.code} : {code.country}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={newPhoneNumber}
                    onChange={e => setNewPhoneNumber(e.target.value)}
                    placeholder="Add new phone number"
                    className="input input-bordered w-3/5 lg:w-3/4 mr-2"
                />
                <button onClick={addPhoneNumber} className="btn btn-primary">
                    <Plus className="w-5 h-5" weight="bold" />
                </button>
            </div>
            <ul>
                {phoneNumbers.map((phone, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center mb-2 p-2 border rounded">
                        <div className="flex items-center">
                            <button
                                onClick={() => deletePhoneNumber(index)}
                                className="mr-2 text-red-500">
                                <Trash className="w-5 h-5" />
                            </button>
                            {phone.number}
                        </div>
                        <div>
                            {phone.verified ? (
                                <SealCheck className="w-8 h-8 text-green-600 mr-2" />
                            ) : null}
                        </div>
                        {!phone.verified && (
                            <button
                                onClick={() => toggleVerification(index)}
                                className="btn btn-sm btn-success text-white">
                                Verify
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <VerificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onVerify={handleVerify}
                methodType="Phone Number"
                contact={currentPhone?.number}
            />
        </div>
    )
}

export default PhoneNumberInput
