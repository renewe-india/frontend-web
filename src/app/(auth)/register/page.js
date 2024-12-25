'use client'

import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    GenderFemale,
    GenderMale,
    GenderNonbinary,
} from '@phosphor-icons/react'
import SubmitButton from '@/components/ui/SubmitButton'
import Spinner from '@/components/ui/Spinner'
import InputField from '@/components/ui/InputField'
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
                    <div>
                        <InputField
                            id="name"
                            label="Name"
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            error={errors.name}
                            required
                        />
                    </div>

                    <div>
                        <InputField
                            id="username"
                            label="Username"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            error={errors.username}
                            required
                        />
                    </div>

                    <div>
                        <InputField
                            id="password"
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            error={errors.password}
                            required
                        />
                    </div>

                    <div>
                        {' '}
                        <InputField
                            id="date_of_birth"
                            label="Date of Birth"
                            placeholder="D. O. B."
                            type="date"
                            value={dateOfBirth}
                            onChange={e => setDateOfBirth(e.target.value)}
                            error={errors.date_of_birth}
                            required
                        />
                    </div>

                    {/* Gender Selection */}
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
                                <GenderMale size="24" weight="duotone" />
                                Male
                            </button>
                            <button
                                type="button"
                                onClick={() => setGender('female')}
                                className={`btn normal-case btn-outline ${
                                    gender === 'female' && 'btn-primary'
                                }`}>
                                <GenderFemale size="24" weight="duotone" />
                                Female
                            </button>
                            <button
                                type="button"
                                onClick={() => setGender('other')}
                                className={`btn normal-case btn-outline ${
                                    gender === 'other' && 'btn-primary'
                                }`}>
                                <GenderNonbinary size="24" weight="duotone" />
                                Other
                            </button>
                            <input type="hidden" name="gender" value={gender} />
                        </div>
                        {errors.gender && (
                            <ErrorDisplay errors={errors.gender} />
                        )}
                    </div>

                    <SubmitButton label="Complete Verification">
                        {isSubmitting && <Spinner spinColor="text-neutral" />}
                    </SubmitButton>
                </form>
            </div>
        </>
    )
}

export default RegisterPage
