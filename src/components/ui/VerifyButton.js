import { CheckCircle } from '@phosphor-icons/react'
import React, { useState } from 'react'

function VerifyButton({ style, itemName, sendOtp, methodType, onVerify }) {
    const [otp, setOtp] = useState('')

    const modalId = `verify_modal_${itemName}`

    const openModal = async () => {
        document.getElementById(modalId).showModal()
        await sendOtp()
    }

    const closeModal = () => {
        document.getElementById(modalId).close()
    }

    const handleVerify = () => {
        onVerify(otp)
        setOtp('')
        closeModal()
    }

    const handleInputChange = (e, index) => {
        const value = e.target.value.substring(0, 1)
        const newOtp = otp.split('')
        newOtp[index] = value
        setOtp(newOtp.join(''))

        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus()
        }
    }

    return (
        <>
            {/* verify Button */}
            <button
                onClick={openModal}
                className={
                    'btn btn-sm btn-success text-white mr-2 flex items-center' +
                    `${style ? style : ''}`
                }>
                <CheckCircle weight="duotone" className="w-5 h-5" /> Verify
            </button>

            {/* Confirmation Modal */}
            <dialog
                id={modalId}
                className="modal flex items-center justify-center">
                <div className="modal-box space-y-5 shadow-lg w-80">
                    <form method="dialog">
                        {/* Close Button */}
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={closeModal}>
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg break-all">
                        Verify Your {methodType} : {itemName}
                    </h3>
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
                                required
                            />
                        ))}
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={handleVerify}
                            className="btn btn-sm btn-success text-white mr-2 flex items-center">
                            <CheckCircle weight="duotone" className="w-5 h-5" />
                            Verify
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default VerifyButton
