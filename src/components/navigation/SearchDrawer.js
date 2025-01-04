'use client'
import React, { useState } from 'react'
import { X, MagnifyingGlass } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import SubmitButton from '../ui/SubmitButton'
import InputField from '../ui/InputField'

function SearchDrawer() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedModel, setSelectedModel] = useState('user')
    const router = useRouter()

    const handleInputChange = e => {
        setSearchTerm(e.target.value)
    }

    const handleModelChange = e => {
        setSelectedModel(e.target.value)
    }

    const handleSearch = () => {
        if (searchTerm.trim() === '') return

        const checkbox = document.getElementById('search')
        router.push(
            `/search/${selectedModel}?search=${encodeURIComponent(searchTerm)}`,
        )
        setSearchTerm('')
        if (checkbox) checkbox.checked = false
    }

    return (
        <div className="drawer absolute z-50 drawer-end">
            <input id="search" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side">
                <label htmlFor="search" className="drawer-overlay" />

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
                            <InputField
                                id="search_term"
                                placeholder="Search"
                                className="input input-primary w-full peer"
                                type="text"
                                name="search_term"
                                value={searchTerm}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className="flex gap-3">
                                <InputField
                                    type="radio"
                                    name="search_model"
                                    value="user"
                                    className="radio radio-primary"
                                    defaultChecked
                                    onChange={handleModelChange}
                                />
                                <span>User</span>
                            </label>
                            <label className="flex gap-3">
                                <InputField
                                    type="radio"
                                    name="search_model"
                                    value="products"
                                    className="radio radio-primary"
                                    defaultChecked
                                    onChange={handleModelChange}
                                />
                                <span>Products</span>
                            </label>
                            <label className="flex gap-3">
                                <InputField
                                    type="radio"
                                    name="search_model"
                                    value="services"
                                    className="radio radio-primary"
                                    defaultChecked
                                    onChange={handleModelChange}
                                />
                                <span>Services</span>
                            </label>
                            <label className="flex gap-3">
                                <InputField
                                    type="radio"
                                    name="search_model"
                                    value="business"
                                    className="radio radio-primary"
                                    defaultChecked
                                    onChange={handleModelChange}
                                />
                                <span>Businesses</span>
                            </label>
                            <label className="flex gap-3">
                                <InputField
                                    type="radio"
                                    name="search_model"
                                    value="association"
                                    className="radio radio-primary"
                                    defaultChecked
                                    onChange={handleModelChange}
                                />
                                <span>Associations</span>
                            </label>
                            <label className="flex gap-3">
                                <InputField
                                    type="radio"
                                    name="search_model"
                                    value="news"
                                    className="radio radio-primary"
                                    defaultChecked
                                    onChange={handleModelChange}
                                />
                                <span>News</span>
                            </label>
                            <label className="flex gap-3">
                                <InputField
                                    type="radio"
                                    name="search_model"
                                    value="events"
                                    className="radio radio-primary"
                                    defaultChecked
                                    onChange={handleModelChange}
                                />
                                <span>Events</span>
                            </label>
                        </div>

                        <SubmitButton type="button" onClick={handleSearch}>
                            <span className="block">
                                <MagnifyingGlass size={24} stroke={2} />
                            </span>
                            Search
                        </SubmitButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchDrawer
