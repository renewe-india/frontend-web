import React from 'react'
import Image from '@/components/Image'
import { DotsThree } from '@phosphor-icons/react/dist/ssr'
import DeleteButton from '@/components/ui/DeleteButton'
import EditManagerRolesButton from './EditManagerRolesButton'
import axios from '@/lib/axios'
import { useToast } from '@/context/ToastContext'

function ManagerRow({ manager, setManagers, organizationName, managerRoles }) {
    const { notifySuccess, notifyError } = useToast()
    const handleDeleteConfirm = async manager => {
        try {
            await axios.patch(
                `/organizations/${organizationName}/managers/${manager?.username}`,
                { roles: [] },
            )

            setManagers(prev =>
                prev.filter(manager => manager.username !== manager.username),
            )
            notifySuccess(`Manager ${manager?.username} deleted successfully!`)
        } catch (error) {
            notifyError(error.response.data.message)
        }
    }

    const handleEditSubmit = async (roles, manager) => {
        try {
            await axios.patch(
                `/organizations/${organizationName}/managers/${manager.username}`,
                { roles: roles },
            )
            setManagers(prev =>
                prev.map(manager =>
                    manager.username === manager.username
                        ? { ...manager, roles }
                        : manager,
                ),
            )
            notifySuccess(`Manager ${manager?.username} updated successfully!`)
        } catch (error) {
            notifyError(error.response.data.message)
        }
    }
    return (
        <div className="flex flex-row items-center bg-base-100 justify-between px-2 md:px-4 py-4 rounded-lg shadow gap-2 md:gap-0">
            <div className="flex flex-row items-center gap-3 w-1/2">
                <div className="hidden lg:block">
                    <Image
                        data={manager.avatar}
                        alt={`Avatar of ${manager.name}`}
                        className="avatar mask mask-squircle h-12 w-12"
                    />
                </div>
                <div className="font-bold">{manager.name}</div>
            </div>
            <div className="w-1/4 text-left text-xs md:text-sm">
                {manager.roles.map((role, index) => (
                    <span key={index}>
                        {role.display_name}
                        {index < manager.roles.length - 1 && ', '}
                    </span>
                ))}
            </div>
            <div className="w-1/4 flex justify-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                        <DotsThree size={24} />
                    </div>
                    <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                        <li>
                            <EditManagerRolesButton
                                currentManager={manager}
                                onSubmit={handleEditSubmit}
                                managerRoles={managerRoles}
                            />
                        </li>
                        <li>
                            <DeleteButton
                                itemName={manager?.username}
                                onDelete={() => handleDeleteConfirm(manager)}
                                style="bg-red-600 text-white flex items-center mr-2"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ManagerRow
