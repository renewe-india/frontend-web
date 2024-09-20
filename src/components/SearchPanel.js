'use client'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('')
    const categories = [
        'users',
        'products',
        'services',
        'business',
        'association',
        'events',
    ]
    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    const router = useRouter()

    const handleInputChange = e => {
        const value = e.target.value
        setSearchTerm(value)
    }

    const handleSearch = e => {
        e.preventDefault()

        if (searchTerm.trim() === '') return

        router.push(
            `/search/${selectedCategory}?search=${encodeURIComponent(
                searchTerm,
            )}`,
        )
    }

    return (
        <div className="w-full">
            <div className="join w-full card bg-base-200 rounded-lg p-5">
                <form onSubmit={handleSearch} className="flex w-full ">
                    <div className="join w-full rounded-full">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Search"
                            className="input input-primary input-bordered join-item w-full"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="select select-primary select-bordered join-item">
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <div className="indicator rounded-full">
                        <button
                            type="submit"
                            className="btn bg-base-100 join-item">
                            <MagnifyingGlass size={24} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
