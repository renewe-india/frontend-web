import { useState } from 'react'
import {
    User,
    IdentificationBadge,
    GenderIntersex,
    Calendar,
} from '@phosphor-icons/react'

export default function SortBy({ onSortChange }) {
    const [selectedSort, setSelectedSort] = useState('')

    const handleSortChange = value => {
        if (selectedSort === value) {
            setSelectedSort('')
            onSortChange('')
        } else {
            setSelectedSort(value)
            onSortChange(value)
        }
    }

    return (
        <div className="dropdown dropdown-bottom">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-outline btn-sm btn-primary rounded-full">
                Sort {selectedSort ? 'By: ' + selectedSort : ''}
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                    <label className="cursor-pointer">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={selectedSort === 'name'}
                            onChange={() => handleSortChange('name')}
                        />
                        <User size={24} />
                        Name
                    </label>
                </li>
                <li>
                    <label className="cursor-pointer">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={selectedSort === 'username'}
                            onChange={() => handleSortChange('username')}
                        />
                        <IdentificationBadge size={24} />
                        Username
                    </label>
                </li>
                <li>
                    <label className="cursor-pointer">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={selectedSort === 'gender'}
                            onChange={() => handleSortChange('gender')}
                        />
                        <GenderIntersex size={24} />
                        Gender
                    </label>
                </li>
                <li>
                    <label className="cursor-pointer">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={selectedSort === 'date_of_birth'}
                            onChange={() => handleSortChange('date_of_birth')}
                        />
                        <Calendar size={24} />
                        Date of Birth
                    </label>
                </li>
            </ul>
        </div>
    )
}
