// components/BusinessCard.js
import React from 'react'
import Image from '@/components/Image'
import SubmitButton from '@/components/SubmitButton'

const ClaimableOrganizationCard = ({ business, onClaim, isSubmitting }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 items-center justify-between mb-4">
            <div className="flex flex-col gap-5 lg:flex-row items-start lg:items-center">
                <div className="flex items-center gap-4">
                    <Image
                        data={business.logo}
                        alt="Business Avatar"
                        customClass="avatar !rounded-full w-16"
                    />
                    <div className="text-xl justify-right font-bold">
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
                    onClick={() => onClaim(business.name)}
                    type="button"
                    className="btn normal-case btn-primary self-end lg:self-auto w-full lg:w-auto"
                />
            </div>
        </div>
    )
}

export default ClaimableOrganizationCard
