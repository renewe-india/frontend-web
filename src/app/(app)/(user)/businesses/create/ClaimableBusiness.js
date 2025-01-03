'use client'
import React, { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import ClaimableOrganizationCard from '@/components/organization/ClaimableOrganizationCard'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import MainCard from '@/components/ui/MainCard'

function ClaimableBusiness({ claimableBusinesses }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState({})
    const [error, setError] = useState(null)

    const handleClaim = async name => {
        setError(null)
        setIsSubmitting(prevState => ({ ...prevState, [name]: true }))

        try {
            await axios.post(`/organizations/${name}/claim`)
            router.push(`/manage/${name}`)
        } catch (error) {
            setError(error.response.data.errors)
        } finally {
            setIsSubmitting(prevState => ({ ...prevState, [name]: false }))
        }
    }

    if (claimableBusinesses.length === 0) {
        return null
    }

    return (
        <MainCard title={`Claimable Businesses`}>
            <div className="mb-4">
                <h2 className="text-base font-semibold">
                    You have {claimableBusinesses.length} businesses available
                    to claim.
                </h2>
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
                {claimableBusinesses.map(business => (
                    <ClaimableOrganizationCard
                        key={business.name}
                        business={business}
                        onClaim={handleClaim}
                        isSubmitting={isSubmitting[business.name] || false}
                    />
                ))}
            </div>
        </MainCard>
    )
}

export default ClaimableBusiness
