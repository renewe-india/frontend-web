'use client'

import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import InputField from '@/components/ui/InputField'
import {
    ArrowLeft,
    EnvelopeOpen,
    EnvelopeSimple,
    SealCheck,
    SealQuestion,
} from '@phosphor-icons/react'
import Loading from '@/components/ui/Loading'
import axios from '@/lib/axios'

const Page = () => {
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

    const submitOtpRequest = event => {
        event.preventDefault()
        setErrors(null)
        setSendingOtp(true)
        forgotPasswordOtp({
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

    const submitResetPassword = event => {
        event.preventDefault()
        setErrors(null)
        setVerifyingOtp(true)
        resetPassword({
            ...constructPayload(),
            otp,
            password,
            otp_confirmation: otp,
            setErrors,
            onSuccess: () => {
                router.push('/login')
                setVerifyingOtp(false)
            },
            onError: () => {
                setVerifyingOtp(false)
            },
        })
    }

    const resetForm = () => {
        setOtpSent(false)
        setContact('')
        setOtp('')
        setPassword('')
        setCountryCode('91')
        setErrors(null)
        setSendingOtp(false)
        setVerifyingOtp(false)
    }

    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await axios.get(
                    '/api/address/countries/isd-codes',
                )
                setCountryCodes(response.data.data)
            } catch (error) {
                // console.error('Failed to fetch country codes:', error)
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
            {otpSent && (
                <div className="flex items-center justify-between mb-4">
                    <div className="w-4 flex-shrink-0 flex items-center">
                        <button
                            type="button"
                            className="flex items-center justify-center"
                            onClick={resetForm}>
                            <ArrowLeft size={24} weight="bold" />
                        </button>
                    </div>
                    <div className="flex-1 text-center text-xl font-bold text-gray-600">
                        Enter New Password
                    </div>
                    <div className="w-4 flex-shrink-0" />
                </div>
            )}

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address or mobile number, and we'll send you an OTP to reset
                your password.
            </div>

            <form
                onSubmit={otpSent ? submitResetPassword : submitOtpRequest}
                className="flex flex-col gap-5">
                {!otpSent && (
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

                        <div className="flex items-center gap-2">
                            {contactType === 'mobile' && (
                                <select
                                    id="countryCode"
                                    className="input input-primary w-1/4 peer"
                                    value={countryCode}
                                    onChange={event =>
                                        setCountryCode(event.target.value)
                                    }>
                                    {countryCodes.map(code => (
                                        <option
                                            key={code.code}
                                            value={code.code}>
                                            +{code.code} : {code.country}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <div className="relative flex items-center w-full">
                                <input
                                    id="contact"
                                    placeholder={
                                        contactType === 'email'
                                            ? 'Email Address'
                                            : 'Mobile Number'
                                    }
                                    className={`input input-primary ${
                                        contactType === 'mobile'
                                            ? 'w-3/4'
                                            : 'w-full'
                                    } peer`}
                                    type="text"
                                    value={contact}
                                    onChange={event =>
                                        setContact(event.target.value)
                                    }
                                    required
                                    autoFocus
                                    disabled={otpSent}
                                />
                            </div>
                        </div>
                    </>
                )}

                {otpSent && (
                    <>
                        <InputField
                            label="Enter OTP"
                            type="number"
                            name="otp"
                            placeholder="Enter OTP"
                            onChange={event => setOtp(event.target.value)}
                            autoComplete="current-otp"
                            required
                        />
                        <InputField
                            label="New Password"
                            type="password"
                            name="password"
                            placeholder="New Password"
                            onChange={event => setPassword(event.target.value)}
                            required
                        />
                    </>
                )}

                {errors?.data && <ErrorDisplay errors={errors.data} />}
                {errors?.type && <ErrorDisplay errors={errors.type} />}
                {errors?.otp && <ErrorDisplay errors={errors.otp} />}

                <button
                    type="submit"
                    className="btn normal-case btn-primary"
                    disabled={sendingOtp || verifyingOtp}>
                    {otpSent ? (
                        verifyingOtp ? (
                            <>
                                <SealQuestion size={24} /> Verifying...
                            </>
                        ) : (
                            <>
                                <SealCheck size={24} /> Reset Password
                            </>
                        )
                    ) : sendingOtp ? (
                        <>
                            <EnvelopeOpen size={24} /> Sending OTP...
                        </>
                    ) : (
                        <>
                            <EnvelopeSimple size={24} /> Send OTP
                        </>
                    )}
                </button>
            </form>
        </>
    )
}

export default Page
