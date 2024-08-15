import { X } from '@phosphor-icons/react'
import { useState } from 'react'

export default function FilterDrawer({ onApplyFilters }) {
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')

    const applyFilters = () => {
        const filters = []

        if (gender) {
            filters.push({
                field: 'gender',
                operator: '=',
                value: gender,
            })
        }

        if (dateOfBirth) {
            filters.push({
                field: 'date_of_birth',
                operator: '>=',
                value: dateOfBirth,
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
                <ul className="menu bg-base-200  min-h-full w-3/4 lg:w-1/4 p-4 space-y-4">
                    <li className="flex  flex-row justify-between items-center">
                        <h1 className="font-bold text-2xl">All filters</h1>
                        <label htmlFor="my-drawer-4" className="cursor-pointer">
                            <X size={24} />
                        </label>
                    </li>
                    <li>
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            className="select select-bordered w-full"
                            value={gender}
                            onChange={e => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="date_of_birth">
                            Date of Birth (after):
                        </label>
                        <input
                            type="date"
                            id="date_of_birth"
                            className="input input-bordered w-full"
                            value={dateOfBirth}
                            onChange={e => setDateOfBirth(e.target.value)}
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
