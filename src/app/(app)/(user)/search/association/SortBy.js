import { useState } from 'react'
import {
    IdentificationBadge,
    Calendar,
    ArrowsDownUp,
    ArrowDown,
    ArrowUp,
} from '@phosphor-icons/react'

export default function SortBy({ onSortChange }) {
    const [selectedSort, setSelectedSort] = useState({
        field: '',
        direction: '',
    })

    const handleSortChange = (field, direction) => {
        if (
            selectedSort.field === field &&
            selectedSort.direction === direction
        ) {
            setSelectedSort({ field: '', direction: '' })
            onSortChange()
        } else {
            setSelectedSort({ field, direction })
            onSortChange({ field, direction })
        }
    }

    const clearFilters = () => {
        setSelectedSort({ field: '', direction: '' })
        onSortChange()
    }

    const getSortLabel = field => {
        const labels = {
            company_size: 'Company Size',
            company_type: 'Company Type',
            date_of_incorporation: 'Date of Inc.',
        }
        return labels[field] || ''
    }

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-outline btn-sm btn-primary rounded-full text-left whitespace-normal break-words px-4 max-w-full">
                <ArrowsDownUp size={20} />{' '}
                {selectedSort.field
                    ? `${getSortLabel(selectedSort.field)} (${
                          selectedSort.direction
                      })`
                    : 'Sort By'}
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {['company_size', 'company_type', 'date_of_incorporation'].map(
                    field => (
                        <li key={field}>
                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={selectedSort.field === field}
                                    onChange={() =>
                                        handleSortChange(field, 'asc')
                                    }
                                />
                                {field === 'company_size' && (
                                    <IdentificationBadge size={24} />
                                )}
                                {field === 'company_type' && (
                                    <IdentificationBadge size={24} />
                                )}
                                {field === 'date_of_incorporation' && (
                                    <Calendar size={24} />
                                )}
                                {getSortLabel(field)}
                            </label>
                            {selectedSort.field === field && (
                                <ul>
                                    <li>
                                        <label className="cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-primary"
                                                checked={
                                                    selectedSort.direction ===
                                                    'asc'
                                                }
                                                onChange={() =>
                                                    handleSortChange(
                                                        field,
                                                        'asc',
                                                    )
                                                }
                                            />
                                            <ArrowUp size={20} />
                                            Ascending
                                        </label>
                                    </li>
                                    <li>
                                        <label className="cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-primary"
                                                checked={
                                                    selectedSort.direction ===
                                                    'desc'
                                                }
                                                onChange={() =>
                                                    handleSortChange(
                                                        field,
                                                        'desc',
                                                    )
                                                }
                                            />
                                            <ArrowDown size={20} />
                                            Descending
                                        </label>
                                    </li>
                                </ul>
                            )}
                        </li>
                    ),
                )}
                <li>
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={clearFilters}>
                        Clear all filters
                    </button>
                </li>
            </ul>
        </div>
    )
}
