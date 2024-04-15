'use client'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ErrorDisplay'

const Page = () => {
    const { onboardingOtp, onboardingVerifyOtp } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const router = useRouter()
    const [username, setUsername] = useState('')
    const [contact, setContact] = useState('')
    const [otp, setOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [errors, setErrors] = useState([])

    const submitOtp = event => {
        event.preventDefault()
        // Handle OTP verification
        onboardingVerifyOtp({
            contact,
            otp,
            setUsername,
            setErrors,
            onSuccess:
                // console.log(data)
                router.push(
                    '/register',
                    // query: { email: data.email },
                ),
        })
    }

    const submitForm = event => {
        event.preventDefault()
        setIsSendingOtp(true)
        onboardingOtp({
            contact,
            setErrors,
            onSuccess: () => {
                setOtpSent(true)
                setIsSendingOtp(false)
            },
            onError: () => {
                setOtpSent(false)
                setIsSendingOtp(false)
            },
        })
    }

    return (
        <>
            <form
                onSubmit={otpSent ? submitOtp : submitForm}
                className="flex flex-col gap-5">
                <div>
                    <label
                        htmlFor="contact"
                        className="pt-0 label label-text font-semibold">
                        <span>Email / Mobile</span>
                    </label>
                    <div className="flex-1 relative">
                        <input
                            id="contact"
                            placeholder=""
                            className="input input-primary w-full peer"
                            type="text"
                            value={contact}
                            onChange={event => setContact(event.target.value)}
                            required
                            autoFocus
                            disabled={otpSent} // Disable input when OTP is sent
                        />
                    </div>
                </div>
                {otpSent && (
                    <div>
                        <label
                            htmlFor="otp"
                            className="pt-0 label label-text font-semibold">
                            <span>OTP</span>
                        </label>
                        <div className="flex-1 relative">
                            <input
                                id="otp"
                                placeholder=""
                                className="input input-primary w-full peer"
                                type="text"
                                value={otp}
                                onChange={event => setOtp(event.target.value)}
                                required
                                autoComplete="current-otp"
                            />
                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    className="btn normal-case btn-primary"
                    disabled={isSendingOtp}>
                    {isSendingOtp
                        ? 'Sending...'
                        : otpSent
                        ? 'Verify'
                        : 'Send OTP'}
                </button>
            </form>
            <ErrorDisplay errors={errors} />
        </>
    )
}

export default Page
