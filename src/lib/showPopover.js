'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function usePopover() {
    const searchParams = useSearchParams()
    const [errorMessage, setErrorMessage] = useState(null)
    const error = searchParams.get('error')
    useEffect(() => {
        if (error) {
            setErrorMessage(decodeURIComponent(error))
        }
    }, [searchParams, error])

    return errorMessage
}
