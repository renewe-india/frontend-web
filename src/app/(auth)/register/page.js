'use client'

import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ui/ErrorDisplay'

const RegisterPage = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })
    const router = useRouter()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('male')
    const [errors, setErrors] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitForm = event => {
        event.preventDefault()
        setIsSubmitting(true)

        if (localStorage.getItem('token')) {
            register({
                name,
                username,
                password,
                contact_id: localStorage.getItem('contact_id'),
                date_of_birth: dateOfBirth,
                gender,
                token: localStorage.getItem('token'),
                setErrors,
                onSuccess: () => {
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
                            </div>{' '}
                            {errors.name && (
                                <ErrorDisplay errors={errors.name} />
                            )}
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
                            {errors.username && (
                                <ErrorDisplay errors={errors.username} />
                            )}
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
                            {errors.password && (
                                <ErrorDisplay errors={errors.password} />
                            )}
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
                            </div>{' '}
                            {errors.date_of_birth && (
                                <ErrorDisplay errors={errors.date_of_birth} />
                            )}
                        </div>

                        <div>
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
                                    className={`btn normal-case btn-outline lg:p-0 ${
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
                            {errors.gender && (
                                <ErrorDisplay errors={errors.gender} />
                            )}
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
