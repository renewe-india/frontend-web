'use client'
import React, { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import ClaimableOrganizationCard from '@/components/organization/ClaimableOrganizationCard'
import ErrorDisplay from '@/components/ui/ErrorDisplay'

function ClaimableBusiness({ businessesAvailableToClaim }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const handleClaim = async name => {
        setError(null)
        setIsSubmitting(true)
        try {
            await axios.post(`/organizations/${name}/claim`)
            router.push(`/manage/${name}`)
        } catch (error) {
            setError(error.response.data.errors)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (businessesAvailableToClaim.length === 0) {
        return null
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 mb-2">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">
                    Businesses Available to Claim:{' '}
                    {businessesAvailableToClaim.length}
                </h2>
                <div className="divider my-0" />
            </div>
            {error && (
                <ErrorDisplay
                    errors={error}
                    onClose={() => {
                        setError(null)
                    }}
                />
            )}
            <div className="space-y-5">
                {businessesAvailableToClaim.map(business => (
                    <ClaimableOrganizationCard
                        key={business.name}
                        business={business}
                        onClaim={handleClaim}
                        isSubmitting={isSubmitting}
                    />
                ))}
            </div>
        </div>
    )
}

export default ClaimableBusiness
