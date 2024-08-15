'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/SubmitButton'
import Image from '@/components/Image'

function ClaimableBusiness() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [
        businessesAvailableToClaim,
        setBusinessesAvailableToClaim,
    ] = useState([])

    const handleClaim = async name => {
        setIsSubmitting(true)
        try {
            await axios.post(`/api/organizations/${name}/claim`)
            router.push(`/manage/${name}`)
        } catch (error) {
            // console.error('Error claiming business:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        const fetchBusinessesAvailableToClaim = async () => {
            try {
                const response = await axios.get(
                    '/api/organizations/available-to-claim',
                )
                setBusinessesAvailableToClaim(response.data.data || [])
            } catch (error) {
                // console.error('Error fetching businesses:', error)
                setBusinessesAvailableToClaim([])
            }
        }

        fetchBusinessesAvailableToClaim()
    }, [])

    if (businessesAvailableToClaim.length === 0) {
        return null
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 mb-2">
            <div className="mb-4">
                <h2 className="text-xl font-bold">
                    Businesses Available to Claim:{' '}
                    {businessesAvailableToClaim.length}
                </h2>
            </div>
            {businessesAvailableToClaim.map(business => (
                <div
                    key={business.name}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 items-center justify-between mb-4">
                    <div className="flex flex-col gap-5 lg:flex-row items-start lg:items-center">
                        <div className="flex items-center gap-4">
                            <Image
                                data={business.logo}
                                alt="Business Avatar"
                                customClass="avatar !rounded-full w-20"
                            />
                            <div className="text-2xl justify-right font-bold">
                                {business.display_name}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-end lg:justify-start">
                        <div className="flex-grow" />
                        <SubmitButton
                            isSubmitting={isSubmitting}
                            label="Claim this Business"
                            submittingLabel="Claiming"
                            onClick={() => handleClaim(business.name)}
                            type="button"
                            className="btn normal-case btn-primary self-end lg:self-auto w-full lg:w-auto"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ClaimableBusiness
