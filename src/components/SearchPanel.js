import { MagnifyingGlass } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('')
    const categories = [
        'users',
        'products',
        'services',
        'businesses',
        'associations',
        'events',
    ]
    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    const router = useRouter()

    const handleInputChange = e => {
        const value = e.target.value
        setSearchTerm(value)
    }

    const handleOptionClick = option => {
        setSearchTerm(option)
    }

    const handleSearch = e => {
        e.preventDefault()
        console.log(selectedCategory)
        console.log(searchTerm)
        if (searchTerm.trim() === '') return

        router.push(
            `/search/${selectedCategory}?search=${encodeURIComponent(
                searchTerm,
            )}`,
        )
    }

    return (
        <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-5">
            <form onSubmit={handleSearch} className="flex items-center ">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    className="input input-primary w-full peer rounded-l-full"
                />
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="input input-primary rounded-none">
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="btn btn-primary rounded-r-full">
                    <MagnifyingGlass size={24} />
                </button>
            </form>
        </div>
    )
}
