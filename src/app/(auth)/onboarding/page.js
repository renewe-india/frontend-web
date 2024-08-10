'use client'
import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ErrorDisplay'
import axios from '@/lib/axios'
import {
    EnvelopeOpen,
    EnvelopeSimple,
    SealCheck,
    SealQuestion,
} from '@phosphor-icons/react'
import Loading from '@/components/Loading'

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
    const [loading, setLoading] = useState(true) // State for loading

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

    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await axios.get(
                    '/api/address/countries/isd-codes',
                )
                setCountryCodes(response.data.data)
            } catch (error) {
                console.error('Failed to fetch country codes:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCountryCodes()
    }, [])

    useEffect(() => {
        setContact('')
        setOtp('')
        setCountryCode('91')
        setOtpSent(false)
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

                    <input
                        id="contact"
                        placeholder={
                            contactType === 'email'
                                ? 'Email Address'
                                : 'Mobile Number'
                        }
                        className={`input input-primary ${
                            contactType === 'mobile' ? 'w-3/4' : 'w-full'
                        } peer`}
                        type="text"
                        value={contact}
                        onChange={event => setContact(event.target.value)}
                        required
                        autoFocus
                        disabled={otpSent}
                    />
                </div>
                {errors?.data && <ErrorDisplay errors={errors.data} />}
                {errors?.type && <ErrorDisplay errors={errors.type} />}
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
                {errors?.otp && errors.otp.length > 0 && (
                    <ErrorDisplay errors={errors.otp} />
                )}
                <button
                    type="submit"
                    className="btn normal-case btn-primary"
                    disabled={sendingOtp || verifyingOtp}>
                    {sendingOtp ? (
                        <>
                            <EnvelopeOpen size={24} /> Sending...
                        </>
                    ) : verifyingOtp ? (
                        <>
                            <SealQuestion size={24} /> Verifying...
                        </>
                    ) : otpSent ? (
                        <>
                            <SealCheck size={24} /> Verify
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
