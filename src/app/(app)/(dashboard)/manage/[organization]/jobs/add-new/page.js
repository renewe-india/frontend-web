'use client'
import { useState } from 'react'

import { CaretDown, Plus, XCircle } from '@phosphor-icons/react'
import TitleCard from '@/components/dashboard/Cards/TitleCard'

const JobForm = () => {
    const [jobTitle, setJobTitle] = useState('')
    const [requiredExperienceMin, setRequiredExperienceMin] = useState('')
    const [requiredExperienceMax, setRequiredExperienceMax] = useState('')
    const [skills, setSkills] = useState([])
    const [recommendedSkills, setRecommendedSkills] = useState([])
    const [jobType, setJobType] = useState('')
    const [partTimeFullTime, setPartTimeFullTime] = useState('')
    const [numberOfOpenings, setNumberOfOpenings] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [
        additionalCandidatePreferences,
        setAdditionalCandidatePreferences,
    ] = useState('')
    const [ctc, setCtc] = useState('')
    const [perks, setPerks] = useState([])
    const [newPerk, setNewPerk] = useState('')
    const [coverLetter, setCoverLetter] = useState('')
    const [availability, setAvailability] = useState('')
    const [assessmentQuestion1, setAssessmentQuestion1] = useState('')
    const [assessmentQuestion2, setAssessmentQuestion2] = useState('')
    const [alternateMobileNumber, setAlternateMobileNumber] = useState('')
    const [numberOfEmployees, setNumberOfEmployees] = useState('')
    const [skillInput, setSkillInput] = useState('')
    const [recommendedSkillInput, setRecommendedSkillInput] = useState('')
    const [responsibilities, setResponsibilities] = useState([])
    const [newResponsibility, setNewResponsibility] = useState('')

    const handleAddResponsibility = () => {
        if (newResponsibility.trim() !== '') {
            setResponsibilities([...responsibilities, newResponsibility])
            setNewResponsibility('') // Clear input field
        }
    }

    const handleRemoveResponsibility = index => {
        const updatedResponsibilities = responsibilities.filter(
            (_, i) => i !== index,
        )
        setResponsibilities(updatedResponsibilities)
    }

    const handleSkillAdd = () => {
        if (skillInput.trim()) {
            setSkills([...skills, skillInput.trim()])
            setSkillInput('') // Clear input after adding
        }
    }

    const handleRecommendedSkillAdd = () => {
        if (recommendedSkillInput.trim()) {
            setRecommendedSkills([
                ...recommendedSkills,
                recommendedSkillInput.trim(),
            ])
            setRecommendedSkillInput('') // Clear input after adding
        }
    }

    const handleSkillRemove = index => {
        setSkills(skills.filter((_, i) => i !== index))
    }

    const handleRecommendedSkillRemove = index => {
        setRecommendedSkills(recommendedSkills.filter((_, i) => i !== index))
    }

    const handleAddPerk = () => {
        if (newPerk.trim() !== '') {
            setPerks([...perks, newPerk])
            setNewPerk('') // Clear input field
        }
    }

    const handleRemovePerk = index => {
        const updatedPerks = perks.filter((_, i) => i !== index)
        setPerks(updatedPerks)
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.log(
        //     'Job Form Data:',
        //     jobTitle,
        //     requiredExperienceMin,
        //     requiredExperienceMax,
        //     skills,
        //     recommendedSkills,
        //     jobType,
        //     partTimeFullTime,
        //     numberOfOpenings,
        //     jobDescription,
        //     responsibilities,
        //     additionalCandidatePreferences,
        //     ctc,
        //     perks,
        //     coverLetter,
        //     availability,
        //     assessmentQuestion1,
        //     assessmentQuestion2,
        //     alternateMobileNumber,
        //     numberOfEmployees,
        // )
    }

    return (
        <TitleCard title="Post a New Job" topMargin="mt-2">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Job Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="jobTitle"
                                className="block text-gray-700 font-bold mb-2">
                                Job Title
                            </label>
                            <input
                                type="text"
                                id="jobTitle"
                                value={jobTitle}
                                onChange={e => setJobTitle(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="requiredExperience"
                                className="block text-gray-700 font-bold mb-2">
                                Required Experience
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    id="requiredExperienceMin"
                                    value={requiredExperienceMin}
                                    onChange={e =>
                                        setRequiredExperienceMin(e.target.value)
                                    }
                                    min="0"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <span>to</span>
                                <input
                                    type="number"
                                    id="requiredExperienceMax"
                                    value={requiredExperienceMax}
                                    onChange={e =>
                                        setRequiredExperienceMax(e.target.value)
                                    }
                                    min="0"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <span>year(s)</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="skills"
                                className="block text-gray-700 font-bold mb-2">
                                Skills Required
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    id="skills"
                                    placeholder="Add skills"
                                    value={skillInput} // Bind the input to state
                                    onChange={e =>
                                        setSkillInput(e.target.value)
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <button
                                    type="button"
                                    onClick={handleSkillAdd}
                                    className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>
                            <ul className="flex gap-2 flex-wrap">
                                {skills.map((skill, index) => (
                                    <li
                                        key={index}
                                        className="bg-primary px-3 py-1 rounded">
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSkillRemove(index)
                                            }
                                            className="ml-2">
                                            <XCircle className="h-4 w-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <label
                                htmlFor="recommendedSkills"
                                className="block text-gray-700 font-bold mb-2">
                                Recommended Skills
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    id="recommendedSkills"
                                    placeholder="Add skills"
                                    value={recommendedSkillInput}
                                    onChange={e =>
                                        setRecommendedSkillInput(e.target.value)
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <button
                                    type="button"
                                    onClick={handleRecommendedSkillAdd}
                                    className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>
                            <ul className="flex gap-2 flex-wrap">
                                {recommendedSkills.map((skill, index) => (
                                    <li
                                        key={index}
                                        className="bg-primary px-3 py-1 rounded">
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRecommendedSkillRemove(
                                                    index,
                                                )
                                            }
                                            className="ml-2">
                                            <XCircle className="h-4 w-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="jobType"
                                className="block text-gray-700 font-bold mb-2">
                                Job Type
                            </label>
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="jobTypeInOffice"
                                        name="jobType"
                                        value="In Office"
                                        checked={jobType === 'In Office'}
                                        onChange={e =>
                                            setJobType(e.target.value)
                                        }
                                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label
                                        htmlFor="jobTypeInOffice"
                                        className="ml-2 block text-sm text-gray-700">
                                        In Office
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="jobTypeHybrid"
                                        name="jobType"
                                        value="Hybrid"
                                        checked={jobType === 'Hybrid'}
                                        onChange={e =>
                                            setJobType(e.target.value)
                                        }
                                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label
                                        htmlFor="jobTypeHybrid"
                                        className="ml-2 block text-sm text-gray-700">
                                        Hybrid
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="jobTypeRemote"
                                        name="jobType"
                                        value="Remote"
                                        checked={jobType === 'Remote'}
                                        onChange={e =>
                                            setJobType(e.target.value)
                                        }
                                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label
                                        htmlFor="jobTypeRemote"
                                        className="ml-2 block text-sm text-gray-700">
                                        Remote
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="partTimeFullTime"
                                className="block text-gray-700 font-bold mb-2">
                                Part-time/Full-time
                            </label>
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="partTime"
                                        name="partTimeFullTime"
                                        value="Part-time"
                                        checked={
                                            partTimeFullTime === 'Part-time'
                                        }
                                        onChange={e =>
                                            setPartTimeFullTime(e.target.value)
                                        }
                                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label
                                        htmlFor="partTime"
                                        className="ml-2 block text-sm text-gray-700">
                                        Part-time
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="fullTime"
                                        name="partTimeFullTime"
                                        value="Full-time"
                                        checked={
                                            partTimeFullTime === 'Full-time'
                                        }
                                        onChange={e =>
                                            setPartTimeFullTime(e.target.value)
                                        }
                                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label
                                        htmlFor="fullTime"
                                        className="ml-2 block text-sm text-gray-700">
                                        Full-time
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="numberOfOpenings"
                                className="block text-gray-700 font-bold mb-2">
                                Number of Openings
                            </label>
                            <input
                                type="number"
                                id="numberOfOpenings"
                                value={numberOfOpenings}
                                onChange={e =>
                                    setNumberOfOpenings(e.target.value)
                                }
                                min="0"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="jobDescription"
                                className="block text-gray-700 font-bold mb-2">
                                Job Description
                            </label>
                            <textarea
                                id="jobDescription"
                                value={jobDescription}
                                onChange={e =>
                                    setJobDescription(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="keyResponsibilities"
                            className="block text-gray-700 font-bold mb-2">
                            Key Responsibilities
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                id="keyResponsibilities"
                                placeholder="Add responsibility"
                                value={newResponsibility}
                                onChange={e =>
                                    setNewResponsibility(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button
                                type="button"
                                onClick={handleAddResponsibility}
                                className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {responsibilities.map((responsibility, index) => (
                                <li
                                    key={index}
                                    className="bg-gray-200 px-3 py-1 rounded flex justify-between items-center">
                                    <span>{responsibility}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveResponsibility(index)
                                        }
                                        className="ml-2 text-red-500">
                                        <XCircle className="h-4 w-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <label
                            htmlFor="additionalCandidatePreferences"
                            className="block text-gray-700 font-bold mb-2">
                            Additional Candidate Preferences
                        </label>
                        <textarea
                            id="additionalCandidatePreferences"
                            value={additionalCandidatePreferences}
                            onChange={e =>
                                setAdditionalCandidatePreferences(
                                    e.target.value,
                                )
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="ctc"
                                className="block text-gray-700 font-bold mb-2">
                                CTC
                            </label>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-2">
                                    ₹
                                    <CaretDown className="h-4 w-4" />
                                </span>
                                <input
                                    type="number"
                                    id="ctc"
                                    value={ctc}
                                    onChange={e => setCtc(e.target.value)}
                                    min="0"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <span>to</span>
                                <input
                                    type="number"
                                    min="0"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <span>per year</span>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="perks"
                                className="block text-gray-700 font-bold mb-2">
                                Perks
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    id="perks"
                                    placeholder="Add a perk"
                                    value={newPerk}
                                    onChange={e => setNewPerk(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddPerk}
                                    className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>
                            <ul className="flex flex-col gap-2">
                                {perks.map((perk, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-200 px-3 py-1 rounded flex justify-between items-center">
                                        <span>{perk}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemovePerk(index)
                                            }
                                            className="ml-2 text-red-500">
                                            <XCircle className="h-4 w-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="coverLetter"
                                className="block text-gray-700 font-bold mb-2">
                                Cover Letter
                            </label>
                            <textarea
                                id="coverLetter"
                                value={coverLetter}
                                onChange={e => setCoverLetter(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="availability"
                                className="block text-gray-700 font-bold mb-2">
                                Availability
                            </label>
                            <textarea
                                id="availability"
                                value={availability}
                                onChange={e => setAvailability(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label
                                htmlFor="assessmentQuestion1"
                                className="block text-gray-700 font-bold mb-2">
                                Assessment Question 1
                            </label>
                            <textarea
                                id="assessmentQuestion1"
                                value={assessmentQuestion1}
                                onChange={e =>
                                    setAssessmentQuestion1(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button
                                type="button"
                                onClick={() => setAssessmentQuestion1('')}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
                                Remove
                            </button>
                        </div>
                        <div>
                            <label
                                htmlFor="assessmentQuestion2"
                                className="block text-gray-700 font-bold mb-2">
                                Assessment Question 2
                            </label>
                            <textarea
                                id="assessmentQuestion2"
                                value={assessmentQuestion2}
                                onChange={e =>
                                    setAssessmentQuestion2(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button
                                type="button"
                                onClick={() => setAssessmentQuestion2('')}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
                                Remove
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="alternateMobileNumber"
                                className="block text-gray-700 font-bold mb-2">
                                Alternate Mobile Number for this Listing
                            </label>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-2">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    id="alternateMobileNumber"
                                    value={alternateMobileNumber}
                                    onChange={e =>
                                        setAlternateMobileNumber(e.target.value)
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="numberOfEmployees"
                                className="block text-gray-700 font-bold mb-2">
                                No. of Employees in your Organization
                            </label>
                            <select
                                id="numberOfEmployees"
                                value={numberOfEmployees}
                                onChange={e =>
                                    setNumberOfEmployees(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">Select Option</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
        </TitleCard>
    )
}

export default JobForm
