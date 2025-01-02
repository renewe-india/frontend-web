'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const fetcher = async () => {
        try {
            const response = await axios.get('/user')
            return response.data.data
        } catch (error) {
            if (error.response.status === 401) {
                return null
            }
            throw error
        }
    }

    const { data: user, error, mutate, isValidating } = useSWR(
        () => (middleware !== 'guest' ? '/user' : null),
        fetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        },
    )

    const isLoading = !user && !error && isValidating

    const csrf = async () => {
        await axios.get('/sanctum/csrf-cookie')
    }

    const login = async ({ setErrors, ...props }) => {
        try {
            await csrf()
            setErrors([])

            await axios.post('/login', props)

            await mutate()
            router.push(redirectIfAuthenticated)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        }
    }

    const register = async ({
        onSuccess,
        onError,
        setErrors,
        token,
        ...props
    }) => {
        try {
            await csrf()
            setErrors([])

            await axios.post(
                `/onboarding/complete/contact/${props.contact_id}`,
                {
                    ...props,
                    token,
                },
            )
            await mutate()

            localStorage.clear()
            onSuccess()
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
            onError()
        }
    }

    const onboardingVerifyOtp = async ({
        setErrors,
        onError,
        onSuccess,
        ...props
    }) => {
        await csrf()
        setErrors([])
        try {
            const response = await axios.post('/onboarding/check-otp', props)
            const data = response.data

            localStorage.setItem('contact_id', data.uuid)
            localStorage.setItem('token', data.token)
            if (data.type === 'Mobile') {
                localStorage.setItem('mobile', data.data)
            }

            onSuccess()
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
            onError()
        }
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
            onSuccess()
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
            onError()
        }
    }

    const forgotPasswordOtp = async ({
        setErrors,
        onSuccess,
        onError,
        ...props
    }) => {
        await csrf()
        setErrors([])
        try {
            await axios.post('/password/forget/send-otp', props)
            onSuccess()
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
            onError()
        }
    }

    const resetPassword = async ({
        setErrors,
        onSuccess,
        onError,
        ...props
    }) => {
        await csrf()
        setErrors([])
        try {
            await axios.post('password/reset', props)
            onSuccess()
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
            onError()
        }
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
        const url = new URL(frontendUrl)
        const domain = url.hostname

        document.cookie = `last-auth-check=; max-age=0; path=/; domain=${domain}; secure`

        await axios.post('/logout').then(() => mutate())

        localStorage.clear()
        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && error) {
            logout()
        }

        if (middleware === 'auth-guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        ) {
            router.push(redirectIfAuthenticated)
        }
    }, [user, error, middleware, redirectIfAuthenticated, router])

    return {
        user,
        isLoading,
        login,
        onboardingOtp,
        register,
        onboardingVerifyOtp,
        forgotPasswordOtp,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
