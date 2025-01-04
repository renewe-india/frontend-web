'use client'

import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { ArrowLeft, EnvelopeSimple, SealCheck } from '@phosphor-icons/react'
import axios from '@/lib/axios'
import Loading from '@/components/ui/Loading'
import dynamic from 'next/dynamic'
import SubmitButton from '@/components/ui/SubmitButton'
import { ConditionalRender, cn } from '@/lib/utils'

const ContactInputForm = dynamic(() => import('./ContactInputForm'), {
    loading: () => <Loading />,
})
const OTPInputForm = dynamic(() => import('./OTPInputForm'), {
    loading: () => <Loading />,
})

const ForgotPasswordPage = () => {
    const { forgotPasswordOtp, resetPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })
    const router = useRouter()

    const [contactType, setContactType] = useState('email')
    const [countryCode, setCountryCode] = useState('91')
    const [contact, setContact] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [errors, setErrors] = useState(null)
    const [countryCodes, setCountryCodes] = useState([])
    const [loading, setLoading] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)

    const constructPayload = () => ({
        type: contactType,
        country_code: countryCode,
        data: contact,
    })

    const handleOtpRequest = event => {
        event.preventDefault()
        setErrors(null)
        setIsProcessing(true)

        forgotPasswordOtp({
            ...constructPayload(),
            setErrors,
            onSuccess: () => {
                setOtpSent(true)
                setIsProcessing(false)
            },
            onError: () => setIsProcessing(false),
        })
    }

    const handleResetPassword = event => {
        event.preventDefault()
        setErrors(null)
        setIsProcessing(true)

        resetPassword({
            ...constructPayload(),
            otp,
            password,
            otp_confirmation: otp,
            setErrors,
            onSuccess: () => {
                router.push('/login')
                setIsProcessing(false)
            },
            onError: () => setIsProcessing(false),
        })
    }

    const resetForm = () => {
        setOtpSent(false)
        setContact('')
        setOtp('')
        setPassword('')
        setCountryCode('91')
        setErrors(null)
    }

    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await axios.get('/address/countries/isd-codes')
                setCountryCodes(response.data.data)
            } finally {
                setLoading(false)
            }
        }

        fetchCountryCodes()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="container mx-auto">
            <ConditionalRender condition={otpSent}>
                <div className="flex items-center justify-between mb-4">
                    <button
                        type="button"
                        onClick={resetForm}
                        className={cn('btn btn-secondary')}>
                        <ArrowLeft size={24} weight="bold" /> Back
                    </button>
                    <h1 className="text-xl font-bold text-center flex-1">
                        Enter New Password
                    </h1>
                </div>
            </ConditionalRender>

            <ConditionalRender condition={!otpSent}>
                <p className="mb-4 text-gray-600">
                    Forgot your password? No problem. Just let us know your
                    email address or mobile number, and we'll send you an OTP to
                    reset your password.
                </p>
            </ConditionalRender>

            <form
                onSubmit={otpSent ? handleResetPassword : handleOtpRequest}
                className="flex flex-col gap-5">
                <ConditionalRender condition={!otpSent}>
                    <ContactInputForm
                        contactType={contactType}
                        setContactType={setContactType}
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        contact={contact}
                        setContact={setContact}
                        countryCodes={countryCodes}
                    />
                </ConditionalRender>
                <ConditionalRender condition={otpSent}>
                    <OTPInputForm
                        otp={otp}
                        setOtp={setOtp}
                        password={password}
                        setPassword={setPassword}
                    />
                </ConditionalRender>

                <ErrorDisplay errors={errors} onClose={() => setErrors(null)} />
                <SubmitButton isSubmitting={isProcessing}>
                    {otpSent ? (
                        <>
                            <SealCheck size={24} /> Reset Password
                        </>
                    ) : (
                        <>
                            <EnvelopeSimple size={24} /> Send OTP
                        </>
                    )}
                </SubmitButton>
            </form>
        </div>
    )
}

export default ForgotPasswordPage
