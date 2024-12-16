'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from '@/lib/axios'
import Loading from '@/components/ui/Loading'
import SortBy from './Sortby'
import FilterDrawer from './FilterDrawer'
import { XCircle } from '@phosphor-icons/react'
import OrganizationCard from '@/components/cards/OrganizationCard'
import NoResultFound from '@/components/ui/NoResultFound'
import UserCard from '../cards/UserCard'

export default function SearchPageComponent({
    searchEndpoint,
    defaultFilter,
    resultCard,
    filterLabels,
    filterConfig,
    sortOptions,
}) {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [sortCriteria, setSortCriteria] = useState('')
    const [filters, setFilters] = useState([])

    const fetchSearchResults = async (sortBy, appliedFilters) => {
        try {
            const decodedSearchTerm = decodeURIComponent(search || '')
            const response = await axios.post(searchEndpoint, {
                search: {
                    value: decodedSearchTerm,
                },
                sort: sortBy ? [sortBy] : [],
                filters: defaultFilter
                    ? [defaultFilter, ...appliedFilters]
                    : appliedFilters,
            })
            setSearchResults(response.data.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (search) {
            fetchSearchResults(sortCriteria, filters)
        }
    }, [search, sortCriteria, filters])

    const handleApplyFilters = newFilters => setFilters(newFilters)

    const handleSortChange = value => setSortCriteria(value)

    const handleRemoveFilter = index => {
        const updatedFilters = [...filters]
        updatedFilters.splice(index, 1)
        setFilters(updatedFilters)
    }

    return (
        <div className="card bg-base-100 space-y-2">
            <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-3">
                <div className="flex flex-row gap-3 items-center flex-wrap">
                    <FilterDrawer
                        onApplyFilters={handleApplyFilters}
                        filterConfig={filterConfig}
                    />
                    {filters.map((filter, index) => (
                        <button
                            key={index}
                            className="btn btn-outline btn-sm flex items-center gap-2 text-left whitespace-normal break-words"
                            onClick={() => handleRemoveFilter(index)}>
                            {filterLabels(filter)}
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
                    <SortBy
                        onSortChange={handleSortChange}
                        sortOptions={sortOptions}
                    />
                </div>
            </div>
            <div className="card bg-base-200 rounded-lg p-5">
                <div className="mb-3">
                    <h1 className="text-sm">
                        {searchResults.length} result
                        {searchResults.length !== 1 ? 's' : ''} found
                    </h1>
                </div>
                {loading ? (
                    <Loading />
                ) : searchResults.length > 0 ? (
                    <div className="space-y-4">
                        {searchResults.map(result =>
                            resultCard === 'user' ? (
                                <UserCard
                                    key={result.name || result.username}
                                    user={result}
                                />
                            ) : (
                                <OrganizationCard
                                    key={result.name || result.username}
                                    organization={result}
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <NoResultFound search={search} />
                )}
            </div>
        </div>
    )
}
