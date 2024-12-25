'use client'

import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import InputField from '@/components/ui/InputField'
import { Lock } from '@phosphor-icons/react'

const PasswordReset = () => {
    const searchParams = useSearchParams()
    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }

    useEffect(() => {
        setEmail(searchParams.get('email'))
    }, [searchParams.get('email')])

    return (
        <>
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputField
                        label="Confirm Password"
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirm Password"
                        value={passwordConfirmation}
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        error={errors}
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button
                        type="submit"
                        className="w-full btn normal-case btn-primary">
                        <Lock size={24} />
                        Reset Password
                    </button>
                </div>
            </form>
        </>
    )
}

export default PasswordReset
