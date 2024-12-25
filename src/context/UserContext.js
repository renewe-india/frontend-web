'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import useSWR from 'swr'
import axios from '@/lib/axios'

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

const fetcher = url => axios.get(url).then(res => res.data.data)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const { data: fetchedUser, isValidating } = useSWR('/user', fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: true,
        revalidateIfStale: true,
        dedupingInterval: 3600000,
    })

    useEffect(() => {
        if (!user && fetchedUser) {
            setUser(fetchedUser)
        }
    }, [fetchedUser])

    return (
        <UserContext.Provider
            value={{ user, isLoading: !user && isValidating }}>
            {children}
        </UserContext.Provider>
    )
}
