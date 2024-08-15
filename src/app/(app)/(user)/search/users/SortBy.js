import { useState } from 'react'
import {
    User,
    IdentificationBadge,
    GenderIntersex,
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

    const handleClearFilter = () => {
        setSelectedSort({ field: '', direction: '' })
        onSortChange()
    }

    const options = [
        { label: 'Name', field: 'name', icon: <User size={24} /> },
        {
            label: 'Username',
            field: 'username',
            icon: <IdentificationBadge size={24} />,
        },
        {
            label: 'Gender',
            field: 'gender',
            icon: <GenderIntersex size={24} />,
        },
        {
            label: 'Date of Birth',
            field: 'date_of_birth',
            icon: <Calendar size={24} />,
        },
    ]

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-outline btn-sm btn-primary rounded-full text-left whitespace-normal break-words px-4 max-w-full">
                <ArrowsDownUp size={20} />{' '}
                {selectedSort.field
                    ? `${selectedSort.field} (${selectedSort.direction})`
                    : 'Sort By'}
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {options.map(option => (
                    <li key={option.field}>
                        <label className="cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                checked={selectedSort.field === option.field}
                                onChange={() =>
                                    handleSortChange(option.field, 'asc')
                                }
                            />
                            {option.icon}
                            {option.label}
                        </label>
                        {selectedSort.field === option.field && (
                            <ul>
                                <li>
                                    <label className="cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={
                                                selectedSort.direction === 'asc'
                                            }
                                            onChange={() =>
                                                handleSortChange(
                                                    option.field,
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
                                                    option.field,
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
                ))}
                <li>
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={handleClearFilter}>
                        Clear all filters
                    </button>
                </li>
            </ul>
        </div>
    )
}
