import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const fetcher = async () => {
        try {
            const response = await axios.get('/api/user')
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                // Handle unauthorized access
                return null
            }
            throw error
        }
    }

    const { data: user, error, mutate } = useSWR(
        () => (middleware !== 'guest' ? '/api/user' : null),
        fetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        },
    )

    const csrf = async () => {
        await axios.get('/sanctum/csrf-cookie')
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        try {
            await csrf()
            setErrors([])
            setStatus(null)

            const res = await axios.post('/login', props)

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
            // localStorage.setItem('email', data.email)
            // localStorage.setItem('username', data.username)
            // localStorage.setItem('name', data.name)
            localStorage.setItem('contact_id', data.id)
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

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()
        setErrors([])
        setStatus(null)
        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.message)
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
                setErrors(error.response.data.message)
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
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && error) {
            logout()
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
        login,
        onboardingOtp,
        register,
        onboardingVerifyOtp,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
