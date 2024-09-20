'use client'

import React, { useState } from 'react'
import axios from '@/lib/axios'
import SearchComponent from '@/components/dashboard/SearchComponent'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { useToast } from '@/context/ToastContext'

function AddManagerModal({
    isModalOpen,
    setIsModalOpen,
    managersRoles,
    organizationName,
    onAddManager,
}) {
    const [managerName, setManagerName] = useState('')
    const [selectedRoles, setSelectedRoles] = useState([])
    const [error, setError] = useState(null)
    const { notifySuccess, notifyError } = useToast()
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.patch(
                `/api/organizations/${organizationName}/managers/${managerName}`,
                {
                    roles: selectedRoles,
                },
            )
            setManagerName('')
            setSelectedRoles([])
            if (onAddManager) {
                onAddManager()
            }
            setIsModalOpen(false)
            notifySuccess('Manager added successfully!')
        } catch (error) {
            notifyError('Error adding manager.')
            setError(error.response.data.errors)
        }
    }

    const handleRoleChange = role => {
        setSelectedRoles(prevSelectedRoles => {
            if (prevSelectedRoles.includes(role)) {
                return prevSelectedRoles.filter(r => r !== role)
            } else {
                return [...prevSelectedRoles, role]
            }
        })
    }
    const handleInputChange = newValue => {
        setManagerName(newValue)
    }
    if (!isModalOpen) return null

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md">
            <div className="bg-base-200 p-6 rounded-lg shadow-lg w-72 lg:w-1/3">
                <h3 className="text-xl font-bold mb-4">Add New Manager</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <SearchComponent
                            placeholder="Search Username"
                            searchUrl="/api/users/search"
                            scopes={[]}
                            resultLabelKey="username"
                            onInputChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-base lg:text-2xl font-bold">
                            Select Roles
                        </label>
                        <div className="flex flex-col gap-2">
                            {managersRoles.map(role => (
                                <div key={role.value} className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">
                                            {role.label}
                                        </span>
                                        <input
                                            type="checkbox"
                                            value={role.value}
                                            checked={selectedRoles.includes(
                                                role.value,
                                            )}
                                            onChange={() =>
                                                handleRoleChange(role.value)
                                            }
                                            className="checkbox checkbox-primary"
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {error?.roles && <ErrorDisplay errors={error.roles} />}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="btn bg-red-600 text-white hover:bg-red-800"
                            onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Manager
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddManagerModal
