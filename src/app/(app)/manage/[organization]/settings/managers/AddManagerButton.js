'use client'

import React, { useState } from 'react'
import axios from '@/lib/axios'
import SearchComponent from '@/components/dashboard/SearchComponent'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { useToast } from '@/context/ToastContext'

function AddManagerButton({
    style,
    managerRoles,
    organizationName,
    onAddManager,
}) {
    const modalId = `add_manager_modal`
    const [managerName, setManagerName] = useState('')
    const [selectedRoles, setSelectedRoles] = useState([])
    const [error, setError] = useState(null)
    const { notifySuccess, notifyError } = useToast()

    const openModal = () => {
        document.getElementById(modalId).showModal()
    }

    const closeModal = () => {
        document.getElementById(modalId).close()
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.patch(
                `/organizations/${organizationName}/managers/${managerName}`,
                {
                    roles: selectedRoles,
                },
            )
            setManagerName('')
            setSelectedRoles([])
            if (onAddManager) {
                onAddManager()
            }
            closeModal()
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

    return (
        <>
            <button
                onClick={openModal}
                className={
                    'btn px-6 btn-sm normal-case btn-primary ' +
                    `${style ? style : ''}`
                }>
                Add Manager
            </button>

            <dialog
                id={modalId}
                className="modal flex items-center justify-center">
                <div className="modal-box bg-base-200 p-6 rounded-lg shadow-lg w-72 lg:w-1/3 relative">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeModal}>
                        ✕
                    </button>
                    <h3 className="text-xl font-bold mb-4">Add New Manager</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <SearchComponent
                                searchUrl="/users/search"
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
                                {managerRoles.map(role => (
                                    <div
                                        key={role.value}
                                        className="form-control">
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
                            <button type="submit" className="btn btn-primary">
                                Add Manager
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default AddManagerButton
