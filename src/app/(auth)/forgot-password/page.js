'use client'

import InputField from '@/components/InputField'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import AuthSessionStatus from '../AuthSessionStatus'
import ErrorDisplay from '@/components/ErrorDisplay'
import { Lock } from '@phosphor-icons/react'

const Page = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <>
            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                email address and we will email you a password reset link that
                that will allow you to choose a new one.
            </div>

            {/* Session Status */}
            <AuthSessionStatus className="mb-4" status={status} />

            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </div>
                <ErrorDisplay errors={errors} />
                <div className="flex items-center justify-end mt-4">
                    <button
                        type="submit"
                        className="w-full btn normal-case btn-primary">
                        <Lock size={24} />
                        Email Password Reset Link
                    </button>
                </div>
            </form>
        </>
    )
}

export default Page
