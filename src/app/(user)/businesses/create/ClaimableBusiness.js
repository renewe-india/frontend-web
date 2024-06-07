'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'

function ClaimableBusiness() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [businessAvailableToClaim, setBusinessAvailableToClaim] = useState(
        null,
    )

    const handleClaim = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        await axios.post(
            `/api/businesses/${businessAvailableToClaim.handle}/claim`,
        )
        setIsSubmitting(false)
        router.push(`/businesses/${businessAvailableToClaim.name}`)
    }

    useEffect(() => {
        const fetchBusinessAvailableToClaim = async () => {
            try {
                const response = await axios.get(
                    '/api/businesses/available-to-claim',
                )
                console.log(response.data.data)
                setBusinessAvailableToClaim(response.data.data)
            } catch (error) {
                if (error.response?.status === 404) {
                    setBusinessAvailableToClaim(null)
                }
            }
        }

        fetchBusinessAvailableToClaim()
    }, [])

    if (!businessAvailableToClaim) {
        return null
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 mb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 items-start justify-between">
                <div className="flex flex-col gap-5 lg:flex-row items-start lg:items-center">
                    <div className="flex items-start items-center text-right gap-5">
                        <div className="avatar">
                            <div className="w-7 rounded-full !rounded !h-12 !w-12">
                                <img
                                    src="https://picsum.photos/400"
                                    alt="avatar"
                                />
                            </div>
                        </div>
                        <div className="text-2xl font-bold">
                            {businessAvailableToClaim.name}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-end lg:justify-start">
                    <div className="flex-grow"></div>
                    <button
                        type="button"
                        onClick={handleClaim}
                        className={`btn normal-case btn-primary self-end lg:self-auto w-full lg:w-auto ${
                            isSubmitting ? 'opacity-90 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}>
                        <span>
                            {isSubmitting ? 'Claiming' : 'Claim this Business'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ClaimableBusiness
