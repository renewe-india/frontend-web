'use client'
import React, { useState, useEffect } from 'react'
import ErrorDisplay from '@/components/ErrorDisplay'
import axios from '@/lib/axios'

function SearchBusiness() {
    const [business, setBusiness] = useState('')
    const [errors, setErrors] = useState([])
    const [results, setResults] = useState([])

    const handleChange = e => {
        setBusiness(e.target.value)
    }

    useEffect(() => {
        const fetchBusinesses = async () => {
            if (business.trim() === '') {
                setResults([])
                return
            }

            try {
                const response = await axios.get('/api/businesses', {
                    params: { search: business },
                    headers: {
                        Accept: 'application/json',
                    },
                })
                console.log(response.data.data)
                console.log(response.data.message)
                setResults(response.data)
            } catch (error) {
                console.error('Error fetching businesses:', error)
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
                <div className="flex">
                    <div className="flex-1 relative">
                        <input
                            placeholder="Business"
                            className="input input-primary w-full peer rounded"
                            type="text"
                            name="business"
                            value={business}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {results.length > 0 && (
                    <div className="dropdown mt-2">
                        <ul className="menu bg-base-200 w-full rounded-box">
                            {results.map(result => (
                                <li key={result.id}>
                                    <a>{result.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <ErrorDisplay errors={errors} />
        </>
    )
}

export default SearchBusiness
{
    /* <button
                type="submit"
                className="btn normal-case btn-primary"
                disabled={isSubmitting}>
                <span>
                    {isSubmitting
                        ? 'Creating a New Business...'
                        : 'Create a New Business'}
                </span>
            </button> */
}
