'use client'
import React, { useEffect, useCallback, useState } from 'react'
import SubmitButton from '@/components/ui/SubmitButton'
import { PencilSimple } from '@phosphor-icons/react'
import { cn, ConditionalRender } from '@/lib/utils'

function EditManagerRolesButton({
    style,
    currentManager,
    onSubmit,
    managerRoles,
}) {
    const [roles, setRoles] = useState([])
    const modalId = `edit_modal_${currentManager.username}`

    const openModal = () => {
        document.getElementById(modalId).showModal()
    }

    const closeModal = () => {
        document.getElementById(modalId).close()
    }

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
        <>
            {/* Edit Button */}
            <button
                onClick={openModal}
                className={cn(
                    'btn btn-sm bg-blue-600 text-white mr-2 flex items-center',
                    style,
                )}>
                <PencilSimple className="w-5 h-5" /> Edit
            </button>

            {/* Edit Modal */}
            <dialog
                id={modalId}
                className="modal flex items-center justify-center">
                <div className="modal-box w-72 p-8 rounded-lg shadow-lg bg-base-200 relative">
                    <form
                        onSubmit={e => {
                            e.preventDefault()
                            onSubmit()
                        }}>
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={closeModal}>
                            ✕
                        </button>

                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col text-base lg:text-xl font-bold">
                                <span>Select Roles:</span>
                                <span className="text-base text-primary">
                                    {currentManager.username}
                                </span>
                            </label>
                            <div className="flex flex-col gap-2">
                                {managerRoles.map(option => (
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

                            <ConditionalRender condition={roles.length > 0}>
                                <SubmitButton label="Save Changes" />
                            </ConditionalRender>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default EditManagerRolesButton
