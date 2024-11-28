'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { SignIn } from '@phosphor-icons/react'

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
                        <label
                            htmlFor="username"
                            className="pt-0 label label-text font-semibold">
                            <span>
                                Username <span className="text-error">*</span>
                            </span>
                        </label>
                        <div className="flex-1 relative">
                            <input
                                id="username"
                                placeholder="Enter your Username"
                                className="input input-primary w-full peer"
                                type="text"
                                value={username}
                                onChange={event =>
                                    setUsername(event.target.value)
                                }
                                required
                                autoFocus
                            />
                        </div>
                    </div>
                    {errors.username && (
                        <ErrorDisplay errors={errors.username} />
                    )}
                    <div>
                        <label
                            htmlFor="password"
                            className="pt-0 label label-text font-semibold">
                            <span>
                                Password <span className="text-error">*</span>
                            </span>
                        </label>
                        <div className="flex-1 relative">
                            <input
                                id="password"
                                placeholder="Enter your Password"
                                className="input input-primary w-full peer"
                                type="password"
                                value={password}
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                required
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                    {errors.password && (
                        <ErrorDisplay errors={errors.password} />
                    )}
                    <button
                        type="submit"
                        className="btn normal-case btn-primary"
                        disabled={isSubmitting}>
                        <SignIn size={24} />
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
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
