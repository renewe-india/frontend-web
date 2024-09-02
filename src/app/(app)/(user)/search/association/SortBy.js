import { useState } from 'react'
import {
    IdentificationBadge,
    Calendar,
    ArrowDown,
    ArrowUp,
    CaretUpDown,
} from '@phosphor-icons/react'

export default function SortBy({ onSortChange }) {
    const [selectedSort, setSelectedSort] = useState({
        field: 'company_size',
        direction: 'asc',
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
        {
            label: 'Company Size',
            field: 'company_size',
            icon: <IdentificationBadge size={24} />,
        },
        {
            label: 'Company Type',
            field: 'company_type',
            icon: <IdentificationBadge size={24} />,
        },
        {
            label: 'Date of Inc.',
            field: 'date_of_incorporation',
            icon: <Calendar size={24} />,
        },
    ]

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-xs rounded-full text-left whitespace-normal break-words px-2 max-w-full flex flex-col items-center">
                <CaretUpDown size={16} />
                {selectedSort.field && (
                    <>
                        {
                            options.find(
                                option => option.field === selectedSort.field,
                            )?.label
                        }
                        {selectedSort.direction === 'asc' ? (
                            <ArrowUp size={16} />
                        ) : (
                            <ArrowDown size={16} />
                        )}
                    </>
                )}
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {options.map(option => (
                    <li key={option.field}>
                        <div className="cursor-pointer flex items-center">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                checked={selectedSort.field === option.field}
                                onChange={() =>
                                    handleSortChange(
                                        option.field,
                                        selectedSort.direction === 'asc'
                                            ? 'desc'
                                            : 'asc',
                                    )
                                }
                            />
                            <span className="ml-2 flex items-center">
                                {option.icon}
                                <span className="ml-2">{option.label}</span>
                                {selectedSort.field === option.field &&
                                    (selectedSort.direction === 'asc' ? (
                                        <ArrowUp size={16} className="ml-2" />
                                    ) : (
                                        <ArrowDown size={16} className="ml-2" />
                                    ))}
                            </span>
                        </div>
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
