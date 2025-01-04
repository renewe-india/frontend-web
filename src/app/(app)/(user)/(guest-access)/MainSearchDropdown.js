'use client'
import InputField from '@/components/ui/InputField'
import MainCard from '@/components/ui/MainCard'
import SubmitButton from '@/components/ui/SubmitButton'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function MainSearchDropdown() {
    const [searchTerm, setSearchTerm] = useState('')
    const categories = [
        'user',
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
        <MainCard CardClassName="join w-full">
            <form onSubmit={handleSearch} className="flex w-full ">
                <div className="join w-2/3 sm:w-full rounded-lg">
                    <InputField
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search"
                        className="input input-neutral input-bordered join-item w-full"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="select select-neutral select-bordered join-item w-1/6 sm:w-auto">
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <div className="indicator rounded-lg w-1/6 sm:w-auto">
                    <SubmitButton className="btn btn-neutral join-item ">
                        <MagnifyingGlass size={24} />
                    </SubmitButton>
                </div>
            </form>
        </MainCard>
    )
}
