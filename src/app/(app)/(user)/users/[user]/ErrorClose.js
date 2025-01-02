'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ErrorClose = ({ error }) => {
    const router = useRouter()

    useEffect(() => {
        if (error) {
            const encodedError = encodeURIComponent(error)
            router.push(`/contacts?error=${encodedError}`)
        }
    }, [error, router])

    return null
}

export default ErrorClose
