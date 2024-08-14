import { CaretDown } from '@phosphor-icons/react'
import { useState } from 'react'

export default function FilterDrawer({ onApplyFilters }) {
    const [createdAt, setCreatedAt] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const applyFilters = () => {
        const filters = []

        if (createdAt) {
            filters.push({
                field: 'created_at',
                operator: '>=',
                value: createdAt,
            })
        }

        filters.push({
            field: 'options->visible',
            operator: '>=',
            value: isVisible,
        })

        onApplyFilters(filters)
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
                    className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-3/4 lg:w-1/4 p-4 space-y-4">
                    <li>
                        <label htmlFor="created_at">Created At (after):</label>
                        <input
                            type="date"
                            id="created_at"
                            className="input input-bordered w-full"
                            value={createdAt}
                            onChange={e => setCreatedAt(e.target.value)}
                        />
                    </li>
                    <li>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={isVisible}
                                onChange={e => setIsVisible(e.target.checked)}
                            />
                            <span className="ml-2">Visible</span>
                        </label>
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
