import React from 'react'
import Image from '@/components/Image'
import { DotsThree, PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr'

function ManagerRow({ manager, onEditClick, onDeleteClick }) {
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
                            <button onClick={() => onEditClick(manager)}>
                                <PencilSimple size={20} color="#7480ff" />
                                Edit
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onDeleteClick(manager)}>
                                <Trash size={20} color="#f01800" />
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ManagerRow
