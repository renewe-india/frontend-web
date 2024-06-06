import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    const [userData, setUserData] = useState(null)
    const [articles, setArticles] = useState([])
    const [availableToClaim, setAvailableToClaim] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)

    const { data: user, error, mutate } = useSWR(
        userData ? '/api/user' : null,
        () =>
            axios
                .get('/api/user')
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status !== 409) throw error

                    router.push('/verify-email')
                }),
    )

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user')
                const user = response.data
                setUserData(user)
            } catch (error) {
                if (error.response.status === 422) {
                    router.push('/login')
                }
            }
        }

        if (!userData) {
            fetchUserData()
        }
    }, [userData])

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        ) {
            router.push(redirectIfAuthenticated)
        }
        if (middleware === 'auth' && error) {
            logout()
        }
    }, [user, error, middleware, redirectIfAuthenticated, router])

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ onSuccess, setErrors, token, ...props }) => {
        try {
            await csrf()

            setErrors([])

            await axios.patch(`/onboarding/${props.username}`, {
                ...props,
                token,
            })
            await mutate()
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
            onSuccess()
        } catch (error) {
            if (error.response.status !== 422) throw error

            setErrors(error.response.data.errors)
            onError()
        }
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        try {
            await csrf()

            setErrors([])
            setStatus(null)

            await axios.post('/login', props)
            await mutate()

            router.push(redirectIfAuthenticated || '/')
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
    ////Request////
    ///NEWS///
    const createNews = async ({ setErrors, formData }) => {
        try {
            await csrf()

            setErrors([])

            const response = await axios.post('/api/news/articles', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })

            router.push(redirectIfAuthenticated)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(['Validation error.'])
            } else {
                console.error('An error occurred while creating news:', error)
                setErrors([
                    'An unexpected error occurred. Please try again later.',
                ])
            }
        }
    }

    const fetchArticles = useCallback(async page => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/api/news/articles?page=${page}`)
            const newArticles = response.data.data // Adjust based on your API response structure
            setArticles(prevArticles => [...prevArticles, ...newArticles])
        } catch (error) {
            console.error('Error fetching articles:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchArticles(page)
    }, [page, fetchArticles])

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                    document.documentElement.offsetHeight - 500 &&
                !isLoading
            ) {
                setPage(prevPage => prevPage + 1)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLoading])

    const getArticle = async ({ articleSlug }) => {
        try {
            const response = await axios.get(
                `/api/news/articles/${articleSlug}`,
            )
            return response.data.data
        } catch (error) {
            console.error('Error fetching article data:', error)
            throw error
        }
    }

    const deleteNews = async ({ articleSlug }) => {
        try {
            await csrf()
            console.log(`${articleSlug}`)
            await axios.delete(`/api/news/articles/${articleSlug}`)
            router.push(redirectIfAuthenticated || '/news')
        } catch (error) {
            console.error('Error deleting article:', error)
            throw error
        }
    }

    ///Business///
    const BusinessAvailableToClaim = async ({ setErrors }) => {
        try {
            await csrf()
            setErrors([])

            const response = await axios.get('/businesses/available-to-claim')
            setAvailableToClaim(response.data.data)

            if (redirectIfAuthenticated) {
                router.push(redirectIfAuthenticated)
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setAvailableToClaim(null)
                router.push('/businesses/create')
            } else {
                setErrors([
                    'An unexpected error occurred. Please try again later.',
                ])
            }
        }
    }

    const CreateNewBusiness = async ({ setErrors, formData }) => {
        try {
            await csrf()

            setErrors([])

            const response = await axios.post('/api/businesses', formData)
            console.log(response.data.message)
            router.push(redirectIfAuthenticated || '/businesses/create')
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(['Validation error.'])
            } else {
                console.error(
                    'An error occurred while creating business:',
                    error,
                )
                setErrors([
                    'An unexpected error occurred. Please try again later.',
                ])
            }
        }
    }
    const CheckBusinessListing = async ({ setErrors, Domain }) => {
        try {
            await csrf()

            setErrors([])

            const response = await axios.post('/api/businesses', formData)
            console.log(response.data.message)
            router.push(redirectIfAuthenticated || '/businesses/create')
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(['Validation error.'])
            } else {
                console.error(
                    'An error occurred while creating business:',
                    error,
                )
                setErrors([
                    'An unexpected error occurred. Please try again later.',
                ])
            }
        }
    }
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
        articles,
        createNews,
        deleteNews,
        getArticle,
        availableToClaim,
        BusinessAvailableToClaim,
        CreateNewBusiness,
        CheckBusinessListing,
    }
}
