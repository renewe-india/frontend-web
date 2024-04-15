'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ErrorDisplay'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    }, [router.reset, errors])

    const submitForm = async event => {
        event.preventDefault()
        setIsSubmitting(true)

        login({
            username,
            password,
            setErrors,
            setStatus,
        })
    }
    useEffect(() => {
        if (errors.length > 0) {
            setIsSubmitting(false)
        }
    }, [errors])
    return (
        <>
            <div className="pb-5">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-bold">Login</div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <form onSubmit={submitForm} className="flex flex-col gap-5">
                        <div>
                            <label
                                htmlFor="username"
                                className="pt-0 label label-text font-semibold">
                                <span>
                                    Username
                                    <span className="text-error">*</span>
                                </span>
                            </label>
                            <div className="flex-1 relative">
                                <input
                                    id="username"
                                    placeholder=""
                                    className="input input-primary w-full peer"
                                    type="username"
                                    value={username}
                                    onChange={event =>
                                        setUsername(event.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="pt-0 label label-text font-semibold">
                                <span>
                                    Password
                                    <span className="text-error">*</span>
                                </span>
                            </label>
                            <div className="flex-1 relative">
                                <input
                                    id="password"
                                    placeholder=""
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
                        <button
                            type="submit"
                            className="btn normal-case btn-primary"
                            disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <ErrorDisplay errors={errors} />
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
        </>
    )
}

export default Login
