'use client'
import React, { useState, useEffect } from 'react'
import ErrorDisplay from '@/components/ErrorDisplay'
import axios from '@/lib/axios'
import Link from 'next/link'
import { Plus } from '@phosphor-icons/react'

function SearchBusiness({ setCreateNewBusinessForm }) {
    const [business, setBusiness] = useState('')
    const [errors, setErrors] = useState([])
    const [results, setResults] = useState([])

    const handleChange = e => {
        setBusiness(e.target.value)
    }
    const handleCreateNewBusiness = e => {
        e.preventDefault()
        setCreateNewBusinessForm(true)
        setBusiness('')
    }

    useEffect(() => {
        const fetchBusinesses = async () => {
            if (business.trim() === '') {
                setResults([])
                return
            }

            try {
                const response = await axios.post('/api/businesses/search', {
                    scopes: [{ name: 'doNotHaveManagers' }],

                    headers: {
                        Accept: 'application/json',
                    },
                })
                console.log(response.data.data)
                setResults(response.data.data)
            } catch (error) {
                console.error(
                    'Error fetching businesses:',
                    error.response.data.message,
                )
                setErrors([
                    'An unexpected error occurred. Please try again later.',
                ])
            }
        }

        const delayDebounceFn = setTimeout(() => {
            fetchBusinesses()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [business])

    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5 my-2 lg:m-0">
                <label className="pt-0 label label-text font-semibold">
                    <div className="text-2xl font-bold">
                        Search Your Business
                    </div>
                </label>
                <div className="relative">
                    <input
                        placeholder="Business"
                        className="input input-primary w-full peer rounded"
                        type="text"
                        name="business"
                        value={business}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {results.length > 0 && (
                        <ul className="dropdown-content z-[1] absolute left-0 w-full mt-1 bg-base-100 rounded-b-lg">
                            {results.map((result, index) => (
                                <li key={index} className="menu">
                                    <Link href={`/businesses/${result.handle}`}>
                                        {result.name}
                                    </Link>
                                </li>
                            ))}
                            <li
                                className="menu"
                                onClick={handleCreateNewBusiness}>
                                <a>
                                    <Plus size={24} stroke={2} />
                                    Create New Business
                                </a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <ErrorDisplay errors={errors} />
        </>
    )
}

export default SearchBusiness
