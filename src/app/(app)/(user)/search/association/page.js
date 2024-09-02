'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from '@/lib/axios'
import Loading from '@/components/Loading'
import SortBy from './SortBy'
import FilterDrawer from './FilterDrawer'
import { XCircle } from '@phosphor-icons/react'
import OrganizationCard from '@/components/cards/OrganizationCard'

export default function associationSearch() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(true)
    //const [error, setError] = useState(null)
    const [sortCriteria, setSortCriteria] = useState('')
    const [filters, setFilters] = useState([])
    const defaultFilter = { field: 'type', operator: '=', value: 'association' }

    const fetchSearchResults = async (sortBy, appliedFilters) => {
        try {
            const decodedSearchTerm = decodeURIComponent(search)
            const response = await axios.post(`/api/organizations/search`, {
                search: {
                    value: decodedSearchTerm,
                },
                sort: sortBy ? [sortBy] : [],
                filters: [defaultFilter, ...appliedFilters],
            })
            setSearchResults(response.data.data)
        } catch (err) {
            // setError('Failed to fetch search results')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (search) {
            fetchSearchResults(sortCriteria, filters)
        }
    }, [search, sortCriteria, filters])

    const handleApplyFilters = newFilters => {
        setFilters(newFilters)
    }
    const handleSortChange = value => {
        setSortCriteria(value)
    }
    const handleRemoveFilter = index => {
        const updatedFilters = [...filters]
        updatedFilters.splice(index, 1)
        setFilters(updatedFilters)
    }

    if (loading) {
        return (
            <div className="card bg-base-200 rounded-lg p-5">
                <Loading />
            </div>
        )
    }

    return (
        <div className="card bg-base-100 space-y-2">
            <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-3">
                <div className="flex flex-row gap-3 items-center flex-wrap">
                    <div className="flex flex-row gap-3 items-center ">
                        <FilterDrawer onApplyFilters={handleApplyFilters} />
                    </div>

                    {filters.map((filter, index) => (
                        <button
                            key={index}
                            className="btn btn-outline btn-sm flex items-center gap-2 text-left whitespace-normal break-words"
                            onClick={() => handleRemoveFilter(index)}>
                            {filter.field === 'company_type' &&
                                `Company Type: ${filter.value}`}
                            {filter.field === 'company_size' &&
                                `Company Type:  ${filter.value}`}
                            {filter.field === 'date_of_incorporation' &&
                                (filter.operator === '>='
                                    ? `Incorporation After: ${filter.value}`
                                    : `Incorporation Before: ${filter.value}`)}
                            <XCircle size={16} />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex-1 ml-2">
                    <div className="divider my-0" />
                </div>
                <div className="flex items-center space-x-2 mx-4">
                    <span className="text-xs">Sort by:</span>
                    <SortBy onSortChange={handleSortChange} />
                </div>
            </div>
            <div className="card bg-base-200 rounded-lg p-5">
                <div className=" mb-3">
                    <h1 className="text-sm">
                        {searchResults.length} result
                        {searchResults.length !== 1 ? 's' : ''} found
                    </h1>
                </div>

                {searchResults.length > 0 ? (
                    <div className="space-y-4">
                        {searchResults.map(business => (
                            <OrganizationCard
                                key={business.name}
                                organization={business}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center  text-center">
                        <img
                            src="/result_not_found.svg"
                            alt="No results found"
                            width={200}
                            height={200}
                        />
                        <div className="mt-4">No results found.</div>
                    </div>
                )}
            </div>
        </div>
    )
}
