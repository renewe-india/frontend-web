import React from 'react'
import SubmitButton from '@/components/ui/SubmitButton'

function EditManagerModal({
    isModalOpen,
    setIsModalOpen,
    currentManager,
    setCurrentManager,
    managersRoles,
    onSubmit,
}) {
    return (
        <dialog
            className={`z-50 fixed inset-0 overflow-y-auto bg-black bg-opacity-20 rounded-lg flex justify-center items-center ${
                isModalOpen ? 'visible' : 'hidden'
            }`}>
            <div className="modal-box w-56 p-8 rounded-lg shadow-lg">
                <form onSubmit={onSubmit}>
                    <SubmitButton
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => setIsModalOpen(false)}
                        label="✕"
                    />
                    <div className="flex flex-col gap-4">
                        <label className="pt-0 label label-text font-semibold">
                            <span>Role</span>
                        </label>
                        <select
                            value={currentManager.role}
                            onChange={e =>
                                setCurrentManager({
                                    ...currentManager,
                                    role: e.target.value,
                                })
                            }
                            className="input input-primary w-full peer rounded"
                            required>
                            <option value="">Select Type</option>
                            {managersRoles.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <SubmitButton label="Save Changes" />
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default EditManagerModal
