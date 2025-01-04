import { ConditionalRender } from '@/lib/utils'
import { Faders, X } from '@phosphor-icons/react'
import { useState } from 'react'

export default function FilterDrawer({
    onApplyFilters,
    filterLength,
    filterConfig,
}) {
    const [filters, setFilters] = useState(() =>
        filterConfig.reduce((acc, { field }) => {
            acc[field] = ''
            return acc
        }, {}),
    )
    const handleChange = (field, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [field]: value,
        }))
    }

    const applyFilters = () => {
        const appliedFilters = []

        filterConfig.forEach(({ field, operator, valueKey }) => {
            const value = filters[field]

            if (field === 'date_of_incorporation_from') {
                const fromDate = filters['date_of_incorporation_from']
                if (fromDate) {
                    appliedFilters.push({
                        field: 'date_of_incorporation',
                        operator: '>=',
                        value: fromDate,
                    })
                }
            }

            if (field === 'date_of_incorporation_to') {
                const toDate = filters['date_of_incorporation_to']
                if (toDate) {
                    appliedFilters.push({
                        field: 'date_of_incorporation',
                        operator: '<=',
                        value: toDate,
                    })
                }
            }

            if (
                field !== 'date_of_incorporation_from' &&
                field !== 'date_of_incorporation_to' &&
                value
            ) {
                appliedFilters.push({
                    field,
                    operator,
                    value: valueKey ? value[valueKey] : value,
                })
            }
        })

        onApplyFilters(appliedFilters)
        document.getElementById('filter-drawer').checked = false
    }

    return (
        <div className="drawer drawer-end">
            <input
                id="filter-drawer"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content">
                <label
                    htmlFor="filter-drawer"
                    className="drawer-button btn btn-outline btn-sm flex items-center gap-2 bg-base-100">
                    <Faders size={16} />
                    Filters
                    <ConditionalRender condition={filterLength > 0}>
                        <span className="badge badge-ghost">
                            {filterLength}
                        </span>
                    </ConditionalRender>
                </label>
            </div>
            <div className="drawer-side z-50">
                <label
                    htmlFor="filter-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />
                <ul className="menu bg-base-200 min-h-full w-3/4 lg:w-1/4 p-8 space-y-4">
                    <li className="flex flex-row justify-between items-center">
                        <h1 className="font-bold text-2xl">All filters</h1>
                        <label
                            htmlFor="filter-drawer"
                            className="cursor-pointer">
                            <X size={24} />
                        </label>
                    </li>

                    {filterConfig.map(
                        ({ label, field, type, options, placeholder }) => {
                            // Check if the field requires two inputs (e.g., date range)
                            if (field === 'date_of_incorporation') {
                                return (
                                    <>
                                        <li key="date_of_incorporation_from">
                                            <label htmlFor="date_of_incorporation_from">
                                                Date of Incorporation (from):
                                            </label>
                                            <input
                                                type="date"
                                                id="date_of_incorporation_from"
                                                className="input input-bordered w-full"
                                                value={
                                                    filters[
                                                        'date_of_incorporation_from'
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleChange(
                                                        'date_of_incorporation_from',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </li>
                                        <li key="date_of_incorporation_to">
                                            <label htmlFor="date_of_incorporation_to">
                                                Date of Incorporation (to):
                                            </label>
                                            <input
                                                type="date"
                                                id="date_of_incorporation_to"
                                                className="input input-bordered w-full"
                                                value={
                                                    filters[
                                                        'date_of_incorporation_to'
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleChange(
                                                        'date_of_incorporation_to',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </li>
                                    </>
                                )
                            }

                            return (
                                <li key={field}>
                                    <label htmlFor={field}>{label}:</label>
                                    {type === 'select' ? (
                                        <select
                                            id={field}
                                            className="select select-bordered w-full"
                                            value={filters[field]}
                                            onChange={e =>
                                                handleChange(
                                                    field,
                                                    e.target.value,
                                                )
                                            }>
                                            <option value="">
                                                {placeholder}
                                            </option>
                                            {Object.entries(options).map(
                                                ([key, option]) => (
                                                    <option
                                                        key={key}
                                                        value={key}>
                                                        {option}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    ) : type === 'date' ? (
                                        <input
                                            type="date"
                                            id={field}
                                            className="input input-bordered w-full"
                                            value={filters[field]}
                                            onChange={e =>
                                                handleChange(
                                                    field,
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    ) : null}
                                </li>
                            )
                        },
                    )}

                    <li>
                        <button
                            className="btn btn-primary"
                            onClick={applyFilters}>
                            Apply Filters
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
