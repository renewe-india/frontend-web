import InputField from '@/components/InputField'
import SubmitButton from '@/components/SubmitButton'
import React, { useState } from 'react'

export default function UpdateContactForm({ businessDetails }) {
    const [mobile, setMobile] = useState(businessDetails.mobile || '')
    const [email, setEmail] = useState(businessDetails.email || '')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleUpdateMobile = event => {
        event.preventDefault()
        setIsSubmitting(true)

        setIsSubmitting(false)
    }
    const handleUpdateEmail = event => {
        event.preventDefault()
        setIsSubmitting(true)

        setIsSubmitting(false)
    }

    return (
        <div>
            <div className="card bg-base-200 rounded-lg mx-2 md:mx-0 mb-2 p-5 flex flex-col gap-5">
                <div className="flex justify-between items-center underline decoration-primary">
                    <div className="flex flex-row">
                        <div className="text-2xl font-bold">
                            Update Contacts:
                        </div>
                        <div className="text-2xl font-semibold">
                            {businessDetails.name}
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 flex flex-col gap-2">
                <form
                    method="POST"
                    onSubmit={handleUpdateMobile}
                    className="flex flex-col gap-5 form-control">
                    <InputField
                        label="Change Mobile"
                        type="text"
                        name="mobile"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                        placeholder="Mobile No."
                        required
                    />

                    <SubmitButton
                        isSubmitting={isSubmitting}
                        label="Update Your Mobile No."
                        submittingLabel="Updating Your Mobile No..."
                    />
                </form>
                <form
                    method="POST"
                    onSubmit={handleUpdateEmail}
                    className="flex flex-col gap-5 form-control">
                    <InputField
                        label="Change Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="example@xyz.com"
                        required
                    />

                    <SubmitButton
                        isSubmitting={isSubmitting}
                        label="Update Your Email"
                        submittingLabel="Updating Your Email..."
                    />
                </form>
            </div>
        </div>
    )
}
