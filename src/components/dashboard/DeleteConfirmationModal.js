import React from 'react'

function DeleteConfirmationModal({
    isModalOpen,
    setIsModalOpen,
    onConfirm,
    managerName,
}) {
    return (
        isModalOpen && (
            <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md">
                <div className="bg-base-200 p-6 rounded-lg shadow-lg w-72 lg:w-1/3">
                    <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                    <p className="mb-4">
                        Are you sure you want to delete {managerName}?
                    </p>
                    <div className="flex justify-end gap-2 ">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="btn btn-primary">
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="btn text-white bg-red-600 hover:bg-red-800">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}

export default DeleteConfirmationModal
