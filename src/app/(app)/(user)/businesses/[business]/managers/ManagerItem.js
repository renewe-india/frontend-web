import React from 'react'
import Image from '@/components/Image'
import { DotsThree, PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr'

function ManagerItem({ manager, onEditClick }) {
    return (
        <div className="flex flex-row items-center justify-between px-2 md:px-4 py-4 rounded-lg shadow gap-2 md:gap-0">
            <div className="flex flex-row items-center gap-3 w-full md:w-1/3">
                <Image
                    data={manager.avatar}
                    alt={`Avatar of ${manager.name}`}
                    className="avatar hidden md:block mask mask-squircle h-12 w-12"
                />
                <div className="font-bold">{manager.name}</div>
            </div>
            <div className="w-full md:w-1/3 text-left text-xs md:text-sm text-left">
                <span>{manager.role}</span>
            </div>
            <div className="dropdown dropdown-end w-full md:w-1/3 flex justify-end md:justify-end">
                <div tabIndex={0} role="button" className="m-1">
                    <DotsThree size={32} />
                </div>
                <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                    <li>
                        <button onClick={() => onEditClick(manager)}>
                            <PencilSimple
                                size={24}
                                color="#3f00e7"
                                weight="fill"
                            />
                            Edit
                        </button>
                    </li>
                    <li>
                        <a>
                            <Trash size={24} color="#f01800" weight="fill" />
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ManagerItem
