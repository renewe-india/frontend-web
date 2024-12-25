'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { SignIn } from '@phosphor-icons/react'
import SubmitButton from '@/components/ui/SubmitButton'
import InputField from '@/components/ui/InputField'

const LoginPage = () => {
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const queryUsername = query.get('username')
        const queryPassword = query.get('password')

        if (queryUsername && queryPassword) {
            setUsername(queryUsername)
            setPassword(queryPassword)
        }
    }, [])

    const submitForm = async event => {
        event.preventDefault()
        setIsSubmitting(true)

        await login({
            username,
            password,
            setErrors,
        })
    }

    useEffect(() => {
        if (Object.keys(errors || {}).length > 0) {
            setIsSubmitting(false)
        }
    }, [errors])

    return (
        <div>
            <div className="pb-5">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-bold">Login</div>
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={submitForm} className="flex flex-col gap-5">
                    <div>
                        <InputField
                            label="Username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            error={errors.username}
                            required
                        />
                    </div>

                    <div>
                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            error={errors.password}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <SubmitButton isSubmitting={isSubmitting} label="Login">
                        <SignIn size={24} />
                    </SubmitButton>
                </form>
                <div className="mt-5 text-center font-semibold">
                    Can't Sign In?
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <Link
                        href="/onboarding"
                        className="btn normal-case btn-outline">
                        Register
                    </Link>
                    <Link
                        href="/forgot-password"
                        className="btn normal-case btn-outline">
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
