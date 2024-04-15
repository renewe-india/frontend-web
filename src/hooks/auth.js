import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    // const [user, setUser] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)
    // const [errors, setError] = useState(null)

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ onSuccess, setErrors, token, ...props }) => {
        try {
            // Assuming csrf() is a function to get CSRF token
            await csrf()

            setErrors([])

            await axios.patch(`/onboarding/${props.username}`, {
                ...props,
                token,
            })
            mutate()
            onSuccess()
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                console.error('An error occurred:', error)
            }

            throw error
        }
    }
    const onboardingVerifyOtp = async ({ setErrors, onSuccess, ...props }) => {
        await csrf()

        setErrors([])

        try {
            const response = await axios.post('/onboarding', props)
            // Handle successful OTP verification
            const { data } = response.data

            localStorage.setItem('token', data.token)
            localStorage.setItem('email', data.email)
            localStorage.setItem('username', data.username)
            onSuccess(data)
        } catch (error) {}
    }

    const onboardingOtp = async ({
        setErrors,
        onSuccess,
        onError,
        ...props
    }) => {
        await csrf()

        setErrors([])

        try {
            await axios.post('/onboarding/send-otp', props)
            onSuccess() // Call the onSuccess callback provided by the caller
        } catch (error) {
            if (error.response.status !== 422) throw error

            setErrors(error.response.data.errors)
            onError() // Call the onError callback provided by the caller
        }
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        try {
            await csrf()

            setErrors([])
            setStatus(null)

            const response = await axios
                .post('/login', props)
                .then(() => mutate())

            router.push(redirectIfAuthenticated || '/dashboard')
        } catch (error) {
            if (error.response?.status === 401) {
                setErrors(['Incorrect username or password. Please try again.'])
            } else if (error.response?.status === 422) {
                setErrors(['Username or password format is incorrect.'])
            } else {
                console.error('An error occurred during login:', error)
                setErrors([
                    'An unexpected error occurred. Please try again later.',
                ])
            }
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        onboardingOtp,
        register,
        onboardingVerifyOtp,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        // isLoading,
        // error,
    }
}
