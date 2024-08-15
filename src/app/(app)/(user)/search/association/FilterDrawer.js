import { X } from '@phosphor-icons/react'
import { useState } from 'react'

const companySizeOptions = {
    '1-10-employees': '1-10 Employees',
    '11-100-employees': '11-100 Employees',
    '101-1000-employees': '101-1000 Employees',
    'more-than-1000-employees': 'More Than 1000 Employees',
}

const companyTypeOptions = {
    'self-employed': 'Self Employed',
    'self-owned': 'Self Owned',
    partnership: 'Partnership',
    'privately-held': 'Privately Held',
    'publicly-held': 'Publicly Held',
    'government-agency': 'Government Agency',
}

export default function FilterDrawer({ onApplyFilters }) {
    const [companySize, setCompanySize] = useState('')
    const [companyType, setCompanyType] = useState('')
    const [dateIncorporationFrom, setDateIncorporationFrom] = useState('')
    const [dateIncorporationTo, setDateIncorporationTo] = useState('')

    const applyFilters = () => {
        const filters = []

        if (companySize) {
            filters.push({
                field: 'company_size',
                operator: '=',
                value: companySize,
            })
        }

        if (companyType) {
            filters.push({
                field: 'company_type',
                operator: '=',
                value: companyType,
            })
        }

        if (dateIncorporationFrom) {
            filters.push({
                field: 'date_of_incorporation',
                operator: '>=',
                value: dateIncorporationFrom,
            })
        }

        if (dateIncorporationTo) {
            filters.push({
                field: 'date_of_incorporation',
                operator: '<=',
                value: dateIncorporationTo,
            })
        }

        onApplyFilters(filters)
        document.getElementById('my-drawer-4').checked = false
    }

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label
                    htmlFor="my-drawer-4"
                    className="drawer-button btn btn-outline btn-sm btn-primary rounded-full">
                    All filters
                </label>
            </div>
            <div className="drawer-side z-50">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />
                <ul className="menu bg-base-200 min-h-full w-3/4 lg:w-1/4 p-4 space-y-4">
                    <li className="flex flex-row justify-between items-center">
                        <h1 className="font-bold text-2xl">All filters</h1>
                        <label htmlFor="my-drawer-4" className="cursor-pointer">
                            <X size={24} />
                        </label>
                    </li>

                    <li>
                        <label htmlFor="company_size">Company Size:</label>
                        <select
                            id="company_size"
                            className="select select-bordered w-full"
                            value={companySize}
                            onChange={e => setCompanySize(e.target.value)}>
                            <option value="">Select Company Size</option>
                            {Object.entries(companySizeOptions).map(
                                ([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="company_type">Company Type:</label>
                        <select
                            id="company_type"
                            className="select select-bordered w-full"
                            value={companyType}
                            onChange={e => setCompanyType(e.target.value)}>
                            <option value="">Select Company Type</option>
                            {Object.entries(companyTypeOptions).map(
                                ([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="date_incorporation_from">
                            Date of Incorporation (from):
                        </label>
                        <input
                            type="date"
                            id="date_incorporation_from"
                            className="input input-bordered w-full"
                            value={dateIncorporationFrom}
                            onChange={e =>
                                setDateIncorporationFrom(e.target.value)
                            }
                        />
                    </li>
                    <li>
                        <label htmlFor="date_incorporation_to">
                            Date of Incorporation (to):
                        </label>
                        <input
                            type="date"
                            id="date_incorporation_to"
                            className="input input-bordered w-full"
                            value={dateIncorporationTo}
                            onChange={e =>
                                setDateIncorporationTo(e.target.value)
                            }
                        />
                    </li>
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
