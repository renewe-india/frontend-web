'use client'

import React, { useState, useCallback } from 'react'
import axios from '@/lib/axios'
import { useToast } from '@/context/ToastContext'
import useFetchOptions from '@/hooks/useFetchOptions'
import AddManagerButton from './AddManagerButton'
import ManagerRow from './ManagerRow'

function ManagersTable({ managers: managersData, organizationName }) {
    const [managers, setManagers] = useState(managersData)
    const { notifyError } = useToast()
    const managerRoles = useFetchOptions('/enums/Main/OrganizationManagerRole')

    const fetchManagers = useCallback(async () => {
        try {
            const response = await axios.get(
                `/organizations/${organizationName}/managers`,
            )
            setManagers(response.data.data)
        } catch (error) {
            notifyError('Error fetching Managers:', error.response.data.message)
        }
    }, [organizationName])

    return (
        <div className="card bg-base-200 rounded-lg mx-2 md:mx-0 mb-2 lg:p-5 flex flex-col gap-5">
            <div className="flex justify-between items-center underline decoration-primary">
                <div className="text-2xl font-bold">Business Managers</div>
                <div className="inline-block float-right">
                    <AddManagerButton
                        organizationName={organizationName}
                        managerRoles={managerRoles}
                        onAddManager={fetchManagers}
                    />
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
                            setManagers={setManagers}
                            organizationName={organizationName}
                            managerRoles={managerRoles}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ManagersTable
