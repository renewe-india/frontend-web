import React, { useState } from 'react'
import { Plus, PencilSimple } from '@phosphor-icons/react'
import SelectBox from '@/components/dashboard/Input/SelectBox'

function SocialMediaInput({ socialLinks, updateSocialLinks }) {
    const [selectedPlatform, setSelectedPlatform] = useState('')
    const [link, setLink] = useState('')
    const [customPlatformName, setCustomPlatformName] = useState('')
    const [editingPlatform, setEditingPlatform] = useState(null)

    const platformOptions = [
        { value: 'facebook', name: 'Facebook' },
        { value: 'twitter', name: 'Twitter' },
        { value: 'linkedin', name: 'LinkedIn' },
        { value: 'instagram', name: 'Instagram' },
        { value: 'custom', name: 'Other' },
    ]

    const addSocialLink = () => {
        let platformKey = selectedPlatform
        if (selectedPlatform === 'custom' && customPlatformName) {
            platformKey = customPlatformName
        }

        if (platformKey && link) {
            updateSocialLinks({
                ...socialLinks,
                [platformKey]: link,
            })
            resetInputFields()
        }
    }

    const editSocialLink = platform => {
        setEditingPlatform(platform)
        setSelectedPlatform(
            platformOptions.find(p => p.value === platform)
                ? platform
                : 'custom',
        )
        setLink(socialLinks[platform])
        if (!platformOptions.find(p => p.value === platform)) {
            setCustomPlatformName(platform)
        }
    }

    const resetInputFields = () => {
        setLink('')
        setSelectedPlatform('')
        setCustomPlatformName('')
        setEditingPlatform(null)
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row lg:items-center mb-4">
                <SelectBox
                    placeholder="Select a platform"
                    options={platformOptions}
                    updateFormValue={({ value }) => setSelectedPlatform(value)}
                    containerStyle="md:w-1/5 w-full md:mr-2"
                    value={selectedPlatform}
                />
                {selectedPlatform === 'custom' && (
                    <div className="flex flex-col md:flex-row items-center">
                        <input
                            type="text"
                            value={customPlatformName}
                            onChange={e =>
                                setCustomPlatformName(e.target.value)
                            }
                            placeholder="Enter custom social media name"
                            className="input input-bordered mb-2 md:mb-0 w-full md:mr-2"
                        />
                    </div>
                )}
                <input
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    placeholder="Enter social media link"
                    className="input input-bordered md:w-2/3 w-full md:mr-2"
                />
                <button
                    onClick={addSocialLink}
                    className="btn btn-primary mt-2 md:mt-0">
                    <Plus className="w-5 h-5" weight="bold" />
                    {editingPlatform ? ' Update' : ' Add'}
                </button>
            </div>
            <ul>
                {Object.entries(socialLinks).map(([platform, url], index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center mb-2 p-2 border text-black rounded bg-neutral-content">
                        <span className="truncate">
                            {platform} - {url}
                        </span>
                        <button
                            onClick={() => editSocialLink(platform)}
                            className="btn btn-sm btn-primary ml-4 whitespace-nowrap">
                            <PencilSimple className="w-4 h-4 mr-1" />
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SocialMediaInput
