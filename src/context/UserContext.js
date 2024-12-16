'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

const fetcher = url => axios.get(url).then(res => res.data.data)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const router = useRouter()

    const { data: fetchedUser, error, isValidating } = useSWR(
        '/user',
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 60000,
        },
    )

    useEffect(() => {
        if (fetchedUser) {
            setUser(fetchedUser)
        }
        if (error?.response?.status === 401) {
            router.push('/login')
        }
    }, [fetchedUser, error, router])

    return (
        <UserContext.Provider value={{ user, isLoading: isValidating }}>
            {children}
        </UserContext.Provider>
    )
}
