import React, { useState } from 'react'

function VerificationModal({ isOpen, onClose, onVerify, methodType, contact }) {
    const [otp, setOtp] = useState('')

    const handleSubmit = () => {
        onVerify(otp)
        setOtp('')
    }

    if (!isOpen) return null

    const handleInputChange = (e, index) => {
        const value = e.target.value.substring(0, 1)
        const newOtp = otp.split('')
        newOtp[index] = value
        setOtp(newOtp.join(''))

        // Automatically focus the next input if a digit is entered
        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus()
        }
    }

    return (
        <div className="fixed z-50 inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center">
            <div className="modal-box w-full max-w-xs p-8 rounded-lg shadow-lg bg-white relative">
                <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}>
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">
                    Verify {methodType}: {contact}
                </h2>
                <div className="flex gap-2 justify-center">
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            value={otp[index] || ''}
                            onChange={e => handleInputChange(e, index)}
                            maxLength="1"
                            placeholder="-"
                            className="input input-primary p-0 w-10 h-12 text-center text-lg"
                        />
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={handleSubmit} className="btn btn-primary">
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerificationModal
