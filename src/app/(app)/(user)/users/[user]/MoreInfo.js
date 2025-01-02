'use client'
import { formatDate } from '@/lib/utils/FormatDate'
import {
    Cake,
    GenderFemale,
    GenderMale,
    GenderNonbinary,
    Info,
    Envelope,
    Phone,
} from '@phosphor-icons/react/dist/ssr'
import React from 'react'

const MoreInfo = ({ user }) => {
    const modalId = `more_info_modal`
    const openModal = async () => {
        document.getElementById(modalId).showModal()
    }

    const closeModal = () => {
        document.getElementById(modalId).close()
    }
    return (
        <>
            {/* verify Button */}
            <button
                onClick={openModal}
                className=" text-primary hover:font-semibold my-2 flex items-center">
                <Info className="w-5 h-5 mr-2" /> More Info
            </button>

            {/* Confirmation Modal */}
            <dialog
                id={modalId}
                className="modal flex items-center justify-center">
                <div className="modal-box shadow-lg max-w-lg">
                    <form method="dialog">
                        {/* Close Button */}
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1"
                            onClick={closeModal}>
                            ✕
                        </button>
                    </form>
                    <h3 className="font-semibold text-lg">{user?.name}</h3>
                    <div className="divider divider-neutral my-0" />
                    <div className="mt-4 space-y-4">
                        <div className="flex items-start gap-5">
                            <Cake size="24" className=" mr-2" />
                            <div className="flex flex-col gap-2">
                                <span className="text-base font-semibold">
                                    BirthDay
                                </span>
                                <span>{formatDate(user?.date_of_birth)}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-5">
                            {/* Gender Icon from Phosphor */}
                            {user?.gender === 'female' ? (
                                <GenderFemale
                                    size="24"
                                    className="mr-2 text-xl"
                                />
                            ) : user?.gender === 'male' ? (
                                <GenderMale
                                    size="24"
                                    className="mr-2 text-xl"
                                />
                            ) : user?.gender === 'non-binary' ? (
                                <GenderNonbinary
                                    size="24"
                                    className="mr-2 text-xl"
                                />
                            ) : (
                                <span className="mr-2 text-xl">❓</span>
                            )}
                            <div className="flex flex-col gap-2">
                                <span className="text-base font-semibold">
                                    Gender
                                </span>
                                <span>{user?.gender}</span>
                            </div>
                        </div>
                        <div className="text-lg">Contact Info</div>
                        {user?.email && (
                            <div className="flex items-start gap-5">
                                <Envelope size="24" className="mr-2 text-xl" />
                                <div className="flex flex-col gap-2">
                                    <span className="text-base font-semibold">
                                        Email
                                    </span>
                                    <span>{user?.email}</span>
                                </div>
                            </div>
                        )}

                        {user?.mobile && (
                            <div className="flex items-start gap-5">
                                <Phone size="24" className="mr-2 text-xl" />
                                <div className="flex flex-col gap-2">
                                    <span className="text-base font-semibold">
                                        Mobile
                                    </span>
                                    <span>{user?.mobile}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default MoreInfo
