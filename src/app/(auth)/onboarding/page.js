'use client'

import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import axios from '@/lib/axios'
import {
    EnvelopeSimple,
    SealCheck,
    ArrowClockwise,
} from '@phosphor-icons/react'
import Loading from '@/components/ui/Loading'
import SubmitButton from '@/components/ui/SubmitButton'
import InputField from '@/components/ui/InputField'

const Page = () => {
    const { onboardingOtp, onboardingVerifyOtp } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const router = useRouter()
    const [contactType, setContactType] = useState('email')
    const [countryCode, setCountryCode] = useState('91')
    const [contact, setContact] = useState('')
    const [otp, setOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [sendingOtp, setSendingOtp] = useState(false)
    const [verifyingOtp, setVerifyingOtp] = useState(false)
    const [errors, setErrors] = useState(null)
    const [countryCodes, setCountryCodes] = useState([])
    const [loading, setLoading] = useState(true)

    const constructPayload = () => ({
        type: contactType,
        country_code: countryCode,
        data: contact,
    })

    const submitOtp = event => {
        event.preventDefault()
        setErrors(null)
        setVerifyingOtp(true)
        onboardingVerifyOtp({
            ...constructPayload(),
            otp,
            setErrors,
            onSuccess: () => {
                router.push('/register')
                setVerifyingOtp(false)
            },
            onError: () => {
                setVerifyingOtp(false)
            },
        })
    }

    const submitForm = event => {
        event.preventDefault()
        setSendingOtp(true)
        onboardingOtp({
            ...constructPayload(),
            setErrors,
            onSuccess: () => {
                setOtpSent(true)
                setSendingOtp(false)
            },
            onError: () => {
                setOtpSent(false)
                setSendingOtp(false)
            },
        })
    }

    const resetForm = () => {
        setOtpSent(false)
        setContact('')
        setOtp('')
        setCountryCode('91')
        setErrors(null)
        setSendingOtp(false)
        setVerifyingOtp(false)
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

    useEffect(() => {
        resetForm()
    }, [contactType])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="contactType"
                        value="email"
                        checked={contactType === 'email'}
                        onChange={() => setContactType('email')}
                        className="form-radio"
                    />
                    <span>Email</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="contactType"
                        value="mobile"
                        checked={contactType === 'mobile'}
                        onChange={() => setContactType('mobile')}
                        className="form-radio"
                    />
                    <span>Mobile</span>
                </label>
            </div>
            <form
                onSubmit={otpSent ? submitOtp : submitForm}
                className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                    {contactType === 'mobile' && (
                        <select
                            id="countryCode"
                            className="input input-primary w-1/4 peer"
                            value={countryCode}
                            onChange={event =>
                                setCountryCode(event.target.value)
                            }
                            disabled={otpSent}>
                            {countryCodes.map(code => (
                                <option key={code.code} value={code.code}>
                                    +{code.code} : {code.country}
                                </option>
                            ))}
                        </select>
                    )}

                    <div className="relative flex items-center w-full">
                        <div className="w-full">
                            <InputField
                                id="contact"
                                placeholder={
                                    contactType === 'email'
                                        ? 'Email Address'
                                        : 'Mobile Number'
                                }
                                type={contactType === 'email' ? 'text' : 'tel'}
                                value={contact}
                                onChange={event =>
                                    setContact(event.target.value)
                                }
                                required
                                pattern={
                                    contactType === 'mobile'
                                        ? '[0-9]{10}'
                                        : undefined
                                }
                            />
                        </div>
                        {otpSent && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="absolute right-0 mr-2">
                                <ArrowClockwise size={24} />
                            </button>
                        )}
                    </div>
                </div>
                {errors?.data && <ErrorDisplay errors={errors.data} />}
                {errors?.type && <ErrorDisplay errors={errors.type} />}
                {otpSent && (
                    <div className="w-full">
                        <InputField
                            id="otp"
                            label="OTP"
                            placeholder="Enter OTP"
                            type="text"
                            value={otp}
                            onChange={event => setOtp(event.target.value)}
                            required
                            autoComplete="current-otp"
                        />
                    </div>
                )}
                {errors?.otp && errors.otp.length > 0 && (
                    <ErrorDisplay errors={errors.otp} />
                )}
                <SubmitButton isSubmitting={sendingOtp || verifyingOtp}>
                    {otpSent ? (
                        <>
                            <SealCheck size={24} /> Verify
                        </>
                    ) : (
                        <>
                            <EnvelopeSimple size={24} /> Send OTP
                        </>
                    )}
                </SubmitButton>
            </form>
        </>
    )
}

export default Page
