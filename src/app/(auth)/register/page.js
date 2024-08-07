'use client'

import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ErrorDisplay'

const RegisterPage = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })
    const router = useRouter()
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [username, setUsername] = useState('')
    const [contact_id, setContact_id] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('male')
    const [errors, setErrors] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const storedUsername = localStorage.getItem('username')
        if (storedUsername) {
            setUsername(storedUsername)
        }
    }, [])

    useEffect(() => {
        const storedContact_id = localStorage.getItem('contact_id')
        if (storedContact_id) {
            setContact_id(storedContact_id)
        }
    }, [])

    useEffect(() => {
        const storedName = localStorage.getItem('name')
        if (storedName) {
            setName(storedName)
        }
    }, [])

    useEffect(() => {
        const storedMobile = localStorage.getItem('mobile')
        if (storedMobile) {
            setMobile(storedMobile)
        }
    }, [])

    useEffect(() => {
        const storedGender = localStorage.getItem('gender')
        if (storedGender) {
            setGender(storedGender)
        }
    }, [])

    const submitForm = event => {
        event.preventDefault()
        setIsSubmitting(true)

        if (localStorage.getItem('token')) {
            register({
                name,
                mobile,
                username,
                password,
                contact_id,
                date_of_birth: dateOfBirth,
                gender,
                token: localStorage.getItem('token'),
                setErrors,
                onSuccess: () => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('username')
                    setIsSubmitting(false)
                    router.push('/')
                },
                onError: () => {
                    setIsSubmitting(false)
                },
            })
        } else {
            alert('Please verify your email first ')
            setIsSubmitting(false)
            // You may need to adjust this part based on your application flow
        }
    }

    return (
        <>
            <div className="pb-5">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-bold ">
                            Create Your Credentials
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <form onSubmit={submitForm} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label
                                htmlFor="first_name"
                                className="pt-0 label label-text font-semibold">
                                <span>
                                    Name
                                    <span className="text-error">*</span>
                                </span>
                            </label>

                            <div className="flex-1 relative">
                                <input
                                    id="name"
                                    placeholder="FullName"
                                    className="input input-primary w-full peer"
                                    type="text"
                                    name="name"
                                    required
                                    value={name}
                                    onChange={event =>
                                        setName(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="">
                            <div>
                                <label
                                    htmlFor="mobile"
                                    className="pt-0 label label-text font-semibold">
                                    <span>
                                        Mobile
                                        <span className="text-error">*</span>
                                    </span>
                                </label>

                                <div className="flex-1 relative">
                                    <input
                                        id="mobile"
                                        placeholder="Mobile No."
                                        className="input input-primary w-full peer"
                                        type="text"
                                        name="mobile"
                                        required
                                        value={mobile}
                                        onChange={event =>
                                            setMobile(event.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

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
                                    placeholder="Username"
                                    className="input input-primary w-full peer"
                                    type="text"
                                    name="username"
                                    required
                                    value={username}
                                    onChange={event =>
                                        setUsername(event.target.value)
                                    }
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
                                    placeholder="••••••••"
                                    className="input input-primary w-full peer"
                                    type="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="date_of_birth"
                                className="pt-0 label label-text font-semibold">
                                <span>
                                    Date of Birth
                                    <span className="text-error">*</span>
                                </span>
                            </label>

                            <div className="flex-1 relative">
                                <input
                                    id="date_of_birth"
                                    placeholder="D. O. B."
                                    className="input input-primary w-full peer"
                                    type="date"
                                    name="date_of_birth"
                                    required
                                    value={dateOfBirth}
                                    onChange={event =>
                                        setDateOfBirth(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div x-data="{gender: 'male'}">
                            <span className="pt-0 label label-text font-semibold">
                                Gender
                            </span>
                            <div className="grid grid-cols-3 gap-5">
                                <button
                                    type="button"
                                    onClick={() => setGender('male')}
                                    className={`btn normal-case btn-outline ${
                                        gender === 'male' && 'btn-primary'
                                    }`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
                                        <path d="M19 5l-5.4 5.4" />
                                        <path d="M19 5h-5" />
                                        <path d="M19 5v5" />
                                    </svg>
                                    Male
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setGender('female')}
                                    className={`btn normal-case btn-outline ${
                                        gender === 'female' && 'btn-primary'
                                    }`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
                                        <path d="M12 14v7" />
                                        <path d="M9 18h6" />
                                    </svg>
                                    Female
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setGender('other')}
                                    className={`btn normal-case btn-outline ${
                                        gender === 'other' && 'btn-primary'
                                    }`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
                                        <path d="M7 12h11" />
                                    </svg>
                                    Other
                                </button>
                                <input
                                    type="hidden"
                                    name="gender"
                                    value={gender}
                                />
                            </div>
                            <ErrorDisplay errors={errors} />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn normal-case w-full btn-primary"
                        disabled={isSubmitting}>
                        {isSubmitting
                            ? 'Registering...'
                            : 'Complete Verification'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default RegisterPage
