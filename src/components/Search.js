import React from 'react'
import { X, MagnifyingGlass } from '@phosphor-icons/react'

function Search() {
    return (
        <div className="drawer absolute z-50 drawer-end">
            {/* Toggle visibility */}
            <input id="search" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side">
                {/* Overlay effect, click outside */}
                <label htmlFor="search" className="drawer-overlay" />

                {/* Content */}
                <div className="card bg-base-100 rounded-lg p-5 min-h-screen rounded-none px-8 w-full md:max-w-md shadow dark:shadow-white">
                    <div className="pb-5">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold">Search</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const checkbox = document.getElementById(
                                            'search',
                                        )
                                        if (checkbox) checkbox.checked = false
                                    }}
                                    className="btn normal-case btn-ghost btn-sm">
                                    <span className="block">
                                        <X size={24} stroke={2} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="relative">
                            <input
                                id="search_term"
                                placeholder=" "
                                className="input input-primary w-full peer"
                                type="text"
                                name="search_term"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className="flex gap-3">
                                <input
                                    type="radio"
                                    name="search_model"
                                    value="search_users"
                                    className="radio"
                                    defaultChecked
                                />
                                <span>Users</span>
                            </label>
                            <label className="flex gap-3">
                                <input
                                    type="radio"
                                    name="search_model"
                                    value="search_stock_items"
                                    className="radio"
                                />
                                <span>Product/Services</span>
                            </label>
                            <label className="flex gap-3">
                                <input
                                    type="radio"
                                    name="search_model"
                                    value="search_businesses"
                                    className="radio"
                                />
                                <span>Businesses</span>
                            </label>
                            <label className="flex gap-3">
                                <input
                                    type="radio"
                                    name="search_model"
                                    value="search_associations"
                                    className="radio"
                                />
                                <span>Associations</span>
                            </label>
                            <label className="flex gap-3">
                                <input
                                    type="radio"
                                    name="search_model"
                                    value="search_news"
                                    className="radio"
                                />
                                <span>News</span>
                            </label>
                            <label className="flex gap-3">
                                <input
                                    type="radio"
                                    name="search_model"
                                    value="search_events"
                                    className="radio"
                                />
                                <span>Events</span>
                            </label>
                        </div>

                        <button
                            type="button"
                            className="btn normal-case btn-primary">
                            <span className="block">
                                <MagnifyingGlass size={24} stroke={2} />
                            </span>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
