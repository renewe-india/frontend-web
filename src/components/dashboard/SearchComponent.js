import React, { useState, useEffect, useCallback } from 'react'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import axios from '@/lib/axios'

function SearchComponent({
    placeholder,
    searchUrl,
    scopes,
    resultLabelKey,
    onInputChange,
    clearTrigger,
}) {
    const [query, setQuery] = useState('')
    const [errors, setErrors] = useState([])
    const [results, setResults] = useState([])
    const [isSelecting, setIsSelecting] = useState(false)

    const handleChange = e => {
        const newValue = e.target.value
        setQuery(newValue)

        if (onInputChange && !isSelecting) {
            onInputChange(newValue)
        }

        if (isSelecting) {
            setIsSelecting(false)
        }
    }

    const handleResultClick = result => {
        const resultLabel = result[resultLabelKey]
        setQuery(resultLabel)
        setResults([])

        setIsSelecting(true)

        if (onInputChange) {
            onInputChange(resultLabel)
        }
    }

    useEffect(() => {
        setQuery('')
        setResults([])
        setErrors([])
    }, [clearTrigger])

    const fetchResults = useCallback(async () => {
        if (query.trim() === '' || isSelecting) {
            setResults([])
            return
        }

        try {
            const payload = {
                search: {
                    value: query,
                },
            }

            if (scopes && scopes.length > 0) {
                payload.scopes = scopes
            }

            const response = await axios.post(searchUrl, payload)
            setResults(response.data.data)
        } catch (error) {
            setErrors(['An unexpected error occurred. Please try again later.'])
        }
    }, [query, searchUrl, scopes, isSelecting])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchResults()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [query, fetchResults])

    return (
        <>
            <div className="card bg-base-100 rounded-lg ">
                {placeholder && (
                    <label className="pt-0 label label-text font-semibold">
                        <div className="text-base lg:text-2xl font-bold">
                            {placeholder}
                        </div>
                    </label>
                )}
                <div className="relative">
                    <input
                        placeholder={placeholder}
                        className="input input-primary w-full peer rounded"
                        type="text"
                        name="query"
                        value={query}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {query && (
                        <ul className="dropdown-content z-[1] absolute left-0 w-full mt-1 bg-base-100 rounded-b-lg">
                            {results.length > 0 || isSelecting ? (
                                results.map((result, index) => (
                                    <li key={index} className="menu">
                                        <div
                                            onClick={() =>
                                                handleResultClick(result)
                                            }>
                                            {result[resultLabelKey]}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="menu">
                                    <div>No result found!</div>
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
            <ErrorDisplay errors={errors} />
        </>
    )
}

export default SearchComponent
