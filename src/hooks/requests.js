import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useRequest = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const createNews = async ({ setErrors, setStatus, formData }) => {
        try {
            // Perform CSRF token request if necessary
            await csrf()

            setErrors([])

            const postData = new FormData()
            for (const key in formData) {
                postData.append(key, formData[key])
            }

            const response = await axios.post('/news/articles', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            router.push(redirectIfAuthenticated || '/news')
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
    return { createNews }
}
