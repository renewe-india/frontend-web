'use client'
import React, { useState } from 'react'
import CreateNewBusiness from './CreateNewBusiness'
import { useAuth } from '@/hooks/auth'
import ErrorDisplay from '@/components/ErrorDisplay'
import SearchBusiness from '@/components/SearchBusiness'

const BusinessCreate = () => {
    const { availableToClaim } = useAuth({
        middleware: 'auth',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleClaim = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        // await CreateNewBusiness({
        //     formData,
        //     setErrors,
        // })
        setIsSubmitting(false)
    }

    return (
        <>
            {!availableToClaim && (
                <div className="card bg-base-200 rounded-lg p-5">
                    <div className="pb-5">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold">
                                    This business is Available to claim
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <form
                            method="POST"
                            onSubmit={handleClaim}
                            className="flex flex-col gap-5 justify-between ">
                            <div className="flex flex-row gap-5 justify-between items-center">
                                <div className="flex items-start">
                                    <div className="avatar">
                                        <div className="w-7 rounded-full !rounded !h-24 !w-24">
                                            <img
                                                src="https://picsum.photos/400"
                                                alt="avatar"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-end gap-2">
                                    <div className="text-2xl font-bold">
                                        Spinkraft Venture Pvt. Ltd.
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn normal-case btn-primary"
                                disabled={isSubmitting}>
                                <span>
                                    {isSubmitting
                                        ? 'Claiming'
                                        : 'Available to claim'}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <SearchBusiness />
            {/* {showCreateForm && <CreateNewBusiness />} */}
        </>
    )
}

export default BusinessCreate
