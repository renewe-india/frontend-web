import { Trash } from '@phosphor-icons/react'
import React from 'react'

function DeleteButton({ style, itemName, onDelete, name }) {
    const modalId = `delete_modal_${itemName}`

    const openModal = () => {
        document.getElementById(modalId).showModal()
    }

    const closeModal = () => {
        document.getElementById(modalId).close()
    }

    const handleDelete = () => {
        onDelete()
        closeModal()
    }

    return (
        <>
            {/* Delete Button */}
            <button
                onClick={openModal}
                className={
                    'btn btn-sm bg-red-600 text-white mr-2 flex items-center ' +
                    `${style ? style : ''}`
                }>
                <Trash className="w-5 h-5" /> Delete
            </button>

            {/* Confirmation Modal */}
            <dialog
                id={modalId}
                className="modal flex items-center justify-center">
                <div className="modal-box">
                    <form method="dialog">
                        {/* Close Button */}
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={closeModal}>
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Confirm Deletion</h3>
                    <p className="py-4">
                        Are you sure you want to delete{' '}
                        <b>{name ? name : itemName}</b>? This action cannot be
                        undone.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="btn btn-sm bg-red-600 text-white mr-2 flex items-center"
                            onClick={handleDelete}>
                            <Trash className="w-5 h-5" /> Delete
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DeleteButton
