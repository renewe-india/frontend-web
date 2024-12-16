'use client'

import React, { useEffect, useState, useCallback } from 'react'
import axios from '@/lib/axios'
import { useToast } from '@/context/ToastContext'
import dynamic from 'next/dynamic'
import useFetchOptions from '@/hooks/useFetchOptions'
import Loading from '@/components/ui/Loading'
const ManagerRow = dynamic(() => import('./ManagerRow'), {
    ssr: false,
})
const EditManagerModal = dynamic(() => import('./EditManagerModal'))
const AddManagerModal = dynamic(() => import('./AddManagerModal'))
const DeleteConfirmationModal = dynamic(() =>
    import('@/components/modals/DeleteConfirmationModal'),
)

function ManagersTable({ organizationName }) {
    const [managers, setManagers] = useState(null)
    const [currentManager, setCurrentManager] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [roles, setRoles] = useState([])
    const [deleteManager, setDeleteManager] = useState(null)
    const { notifySuccess, notifyError } = useToast()
    const managersRoles = useFetchOptions('/enums/Main/OrganizationManagerRole')
    const [loading, setLoading] = useState(true)

    const fetchManagers = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                `/organizations/${organizationName}/managers`,
            )
            setManagers(response.data.data)
        } catch (error) {
            notifyError('Error fetching Managers:', error)
        } finally {
            setLoading(false)
        }
    }, [organizationName])

    useEffect(() => {
        fetchManagers()
    }, [fetchManagers])

    const handleEditClick = manager => {
        setCurrentManager(manager)
        setIsEditModalOpen(true)
    }

    const handleDeleteClick = manager => {
        setDeleteManager(manager)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            await axios.patch(
                `/organizations/${organizationName}/managers/${deleteManager?.username}`,
                { roles: [] },
            )
            setIsDeleteModalOpen(false)
            await fetchManagers()
            notifySuccess(
                `Manager ${deleteManager?.username} deleted successfully!`,
            )
            setDeleteManager(null)
        } catch (error) {
            notifyError(error.response.data.message)
        }
    }

    const handleEditSubmit = async e => {
        e.preventDefault()
        try {
            await axios.patch(
                `/organizations/${organizationName}/managers/${currentManager.username}`,
                { roles: roles },
            )
            setIsEditModalOpen(false)
            await fetchManagers()
            notifySuccess(
                `Manager ${currentManager?.username} updated successfully!`,
            )
            setCurrentManager(null)
        } catch (error) {
            notifyError(error.response.data.message)
        }
    }

    const openAddNewManagerModal = () => setIsAddModalOpen(true)
    if (loading) {
        return <Loading />
    }
    return (
        <div className="card bg-base-200 rounded-lg mx-2 md:mx-0 mb-2 lg:p-5 flex flex-col gap-5">
            <div className="flex justify-between items-center underline decoration-primary">
                <div className="text-2xl font-bold">Business Managers</div>
                <div className="inline-block float-right">
                    <button
                        className="btn px-6 btn-sm normal-case btn-primary"
                        onClick={openAddNewManagerModal}>
                        Add New
                    </button>
                </div>
            </div>

            {managers && (
                <div className="lg:px-5 flex flex-col gap-2">
                    <div className="flex justify-between font-bold">
                        <div className="w-1/2 pl-2">Name</div>
                        <div className="w-1/4">Role</div>
                        <div className="w-1/4" />
                    </div>
                    {managers.map((manager, index) => (
                        <ManagerRow
                            key={index}
                            manager={manager}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />
                    ))}
                    {currentManager && (
                        <EditManagerModal
                            isModalOpen={isEditModalOpen}
                            setIsModalOpen={setIsEditModalOpen}
                            currentManager={currentManager}
                            setCurrentManager={setCurrentManager}
                            onSubmit={handleEditSubmit}
                            roles={roles}
                            setRoles={setRoles}
                            managersRoles={managersRoles}
                        />
                    )}
                    <AddManagerModal
                        organizationName={organizationName}
                        isModalOpen={isAddModalOpen}
                        setIsModalOpen={setIsAddModalOpen}
                        managersRoles={managersRoles}
                        onAddManager={fetchManagers}
                    />

                    <DeleteConfirmationModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={handleDeleteConfirm}
                        contact={deleteManager?.name}
                    />
                </div>
            )}
        </div>
    )
}

export default ManagersTable
