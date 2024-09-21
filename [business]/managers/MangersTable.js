'use client'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import ManagerItem from './ManagerItem'
import EditManagerModal from './EditManagerModal'

function ManagersTable({ businessHandle }) {
    const [managers, setManagers] = useState(null)
    const [currentManager, setCurrentManager] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [managersRoles, setManagersRoles] = useState([])

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await axios.get(
                    `/api/businesses/${businessHandle}/managers`,
                )
                setManagers(response.data.data)
            } catch (error) {
                //console.error('Error fetching Managers:', error)
            }
        }
        fetchManagers()
    }, [businessHandle])

    const handleEditClick = async manager => {
        setCurrentManager(manager)
        setIsModalOpen(true)
        await fetchManagersRole()
    }

    const fetchManagersRole = async () => {
        try {
            const response = await axios.get('/api/enums/data', {
                params: {
                    enum_path: 'BusinessManagerRole',
                },
            })
            const managersRolesData = response.data.data
            const managersRolesOptions = Object.entries(managersRolesData).map(
                ([key, value]) => ({
                    value: key,
                    label: value,
                }),
            )
            setManagersRoles(managersRolesOptions)
        } catch (error) {
            // console.error('Error fetching Managers Roles:', error)
        }
    }

    const handleEditSubmit = async e => {
        e.preventDefault()

        try {
            await axios.patch(
                `/api/businesses/${businessHandle}/managers/${currentManager.username}/pivot`,
                {
                    pivot: {
                        role: `${currentManager.role}`,
                    },
                },
            )
        } catch (error) {
            //console.error('Error fetching countries:', error)
        }
        setCurrentManager(null)
        //setIsModalOpen(false)
    }

    return (
        <>
            <div className="card bg-base-200 rounded-lg mx-2 md:mx-0 mb-2 p-5 flex flex-col gap-5">
                <div className="flex justify-between items-center underline decoration-primary">
                    <div>
                        <div className="text-2xl font-bold">
                            Business Managers
                        </div>
                    </div>
                </div>
            </div>
            {managers && (
                <div className="px-5 flex flex-col gap-2">
                    <div className="flex justify-between font-bold">
                        <div className="w-1/3 pl-2">Name</div>
                        <div className="w-1/3">Role</div>
                        <div className="w-1/3" />
                    </div>
                    {managers.map((manager, index) => (
                        <ManagerItem
                            key={index}
                            manager={manager}
                            onEditClick={handleEditClick}
                        />
                    ))}
                    {currentManager && (
                        <EditManagerModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            currentManager={currentManager}
                            setCurrentManager={setCurrentManager}
                            managersRoles={managersRoles}
                            onSubmit={handleEditSubmit}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default ManagersTable
