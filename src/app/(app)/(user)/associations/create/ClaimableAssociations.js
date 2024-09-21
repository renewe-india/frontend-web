'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import ClaimableOrganizationCard from '@/components/organization/ClaimableOrganizationCard'

function ClaimableAssociations() {
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
            // console.error('Error claiming business:', error);
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
                // console.error('Error fetching businesses:', error);
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
                <h2 className="text-2xl font-bold">
                    Businesses Available to Claim:{' '}
                    {businessesAvailableToClaim.length}
                </h2>{' '}
                <div className="divider my-0" />
            </div>
            {businessesAvailableToClaim.map(business => (
                <ClaimableOrganizationCard
                    key={business.name}
                    business={business}
                    onClaim={handleClaim}
                    isSubmitting={isSubmitting}
                />
            ))}
        </div>
    )
}

export default ClaimableAssociations
