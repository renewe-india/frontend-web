import React, { useState, useEffect, useCallback } from 'react'
import axios from '@/lib/axios'
import { Trash } from '@phosphor-icons/react'
import ErrorDisplay from '@/components/ui/ErrorDisplay'

function SkillComponent({
    placeholder = 'Search for skills...',
    searchUrl = 'skills/search',
    resultLabelKey = 'name',
    resultSlug = 'slug',
    clearTrigger,
    label,
    skills,
    setSkills,
}) {
    const [query, setQuery] = useState('')
    const [errors, setErrors] = useState([])
    const [results, setResults] = useState([])
    const [isSelecting, setIsSelecting] = useState(false)
    const [selectedSkill, setSelectedSkill] = useState(null)
    const [experience, setExperience] = useState('')
    const [expUnit, setExpUnit] = useState('year')

    const handleChange = e => {
        const newValue = e.target.value
        setQuery(newValue)

        if (isSelecting) {
            setIsSelecting(false)
        }
    }

    const handleResultClick = result => {
        const skillLabel = result[resultLabelKey]
        const skillSlug = result[resultSlug]
        setQuery(skillLabel)
        setResults([])
        setIsSelecting(true)
        setSelectedSkill(skillSlug)
    }

    useEffect(() => {
        setQuery('')
        setResults([])
        setErrors([])
    }, [clearTrigger])

    const fetchResults = useCallback(async () => {
        if (query.trim() === '' || isSelecting) {
            setResults([])
            return
        }

        try {
            const payload = {
                search: {
                    value: query,
                },
            }

            const response = await axios.post(searchUrl, payload)
            setResults(response.data.data)
        } catch (error) {
            setErrors(['An unexpected error occurred. Please try again later.'])
        }
    }, [query, searchUrl, isSelecting])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchResults()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [query, fetchResults])

    const convertToMonths = (value, unit) => {
        const numericValue = parseFloat(value)
        if (isNaN(numericValue)) return null

        return unit === 'year'
            ? Math.round(numericValue * 12)
            : Math.round(numericValue)
    }

    const handleAddSkill = () => {
        if (
            selectedSkill &&
            !skills.find(skill => skill.slug === selectedSkill)
        ) {
            const minimumExperience = experience
                ? convertToMonths(experience, expUnit)
                : null
            setSkills(prevSkills => [
                ...prevSkills,
                { slug: selectedSkill, minimum_experience: minimumExperience },
            ])
        } else {
            alert(`${selectedSkill} is already added! `)
        }
        setSelectedSkill(null)
        setQuery('')
        setExperience('')
        setExpUnit('year')
    }

    const removeSkill = skillToRemove => {
        setSkills(prevSkills =>
            prevSkills.filter(skill => skill.slug !== skillToRemove.slug),
        )
    }

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="card bg-base-100 rounded-lg col-spans-1">
                        {label && (
                            <label className="pt-0 label label-text font-semibold">
                                <div className="text-base lg:text-2xl font-bold">
                                    {label}
                                </div>
                            </label>
                        )}
                        <div className="relative">
                            <input
                                placeholder={placeholder}
                                className="input input-bordered w-full"
                                type="text"
                                name="query"
                                value={query}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <ul className="dropdown-content z-[1] absolute left-0 w-full mt-1 bg-base-100 rounded-b-lg">
                                {results.length > 0 && (
                                    <>
                                        {results.map((result, index) => (
                                            <li key={index} className="menu">
                                                <div
                                                    onClick={() =>
                                                        handleResultClick(
                                                            result,
                                                        )
                                                    }>
                                                    {result[resultLabelKey]}
                                                </div>
                                            </li>
                                        ))}
                                    </>
                                )}
                                {results.length === 0 &&
                                    query.trim() !== '' &&
                                    !isSelecting && (
                                        <li className="menu">
                                            <div>No results found.</div>
                                        </li>
                                    )}
                            </ul>
                        </div>
                    </div>

                    <div className="flex lg:flex-row flex-col lg:items-center gap-2 col-spans-1">
                        <input
                            type="number"
                            className="input input-bordered"
                            placeholder="Experience"
                            min={'0'}
                            value={experience}
                            onChange={e => setExperience(e.target.value)}
                        />
                        <select
                            className="select select-bordered"
                            value={expUnit}
                            onChange={e => setExpUnit(e.target.value)}>
                            <option value="year">Years</option>
                            <option value="month">Months</option>
                        </select>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddSkill}>
                            Add Skill
                        </button>
                    </div>
                </div>

                <div className="flex flex-row flex-wrap gap-2">
                    <ul>
                        {skills.map((skill, index) => (
                            <li
                                key={index}
                                className="flex flex-row items-center gap-3 mb-2 p-2 bg-base-200 border border-primary rounded">
                                <div className="flex items-center flex-1">
                                    {skill.slug} (
                                    {skill.minimum_experience || 'N/A'} months)
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="btn btn-sm bg-red-600 text-white flex items-center">
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <ErrorDisplay errors={errors} />
            </div>
        </div>
    )
}

export default SkillComponent
