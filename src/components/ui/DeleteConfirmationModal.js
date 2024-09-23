import React from 'react'

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, contact }) {
    if (!isOpen) return null

    return (
        <div className="fixed z-50 inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center">
            <div className="modal-box w-full max-w-xs p-8 rounded-lg shadow-lg bg-base-100 relative">
                <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}>
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                <p className="text-base mb-6">
                    Are you sure you want to delete : <strong>{contact}</strong>{' '}
                    ?
                </p>

                <div className="flex justify-end gap-2">
                    <button className="btn btn-sm btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-sm btn-error text-white"
                        onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal
