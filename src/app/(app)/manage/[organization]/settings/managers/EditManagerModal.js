'use client'
import React, { useEffect, useCallback } from 'react'
import SubmitButton from '@/components/ui/SubmitButton'

function EditManagerModal({
    isModalOpen,
    setIsModalOpen,
    currentManager,
    onSubmit,
    roles,
    setRoles,
    managersRoles,
}) {
    const handleCheckboxChange = useCallback(
        role => {
            setRoles(prevRoles => {
                const isSelected = prevRoles.includes(role)
                return isSelected
                    ? prevRoles.filter(r => r !== role)
                    : [...prevRoles, role]
            })
        },
        [setRoles],
    )
    useEffect(() => {
        if (currentManager) {
            const initialRoles =
                currentManager.roles?.map(role =>
                    typeof role === 'string' ? role : role.name,
                ) || []
            setRoles(initialRoles)
        }
    }, [currentManager, setRoles])
    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-center ${
                isModalOpen ? 'visible' : 'invisible'
            }`}>
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-md"
                    onClick={() => setIsModalOpen(false)}
                />
            )}

            <div className="modal-box w-72 p-8 rounded-lg shadow-lg bg-base-200 relative">
                <form onSubmit={onSubmit}>
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => setIsModalOpen(false)}>
                        ✕
                    </button>

                    <div className="flex flex-col gap-4">
                        <label className="text-base lg:text-2xl font-bold">
                            <span>Select Roles</span>
                        </label>
                        <div className="flex flex-col gap-2">
                            {managersRoles.map(option => (
                                <div
                                    className="form-control"
                                    key={option.value}>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">
                                            {option.label}
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={roles.includes(
                                                option.value,
                                            )}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    option.value,
                                                )
                                            }
                                            className="checkbox checkbox-primary"
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>

                        <SubmitButton label="Save Changes" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditManagerModal
