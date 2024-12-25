'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function usePopover() {
    const searchParams = useSearchParams()
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const error = searchParams.get('error')
        if (error) {
            setErrorMessage(decodeURIComponent(error))
        }
    }, [searchParams])

    return errorMessage
}
