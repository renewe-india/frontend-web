import React from 'react'
import { PencilSimple, Trash } from '@phosphor-icons/react'

const AddressCard = ({
    address,
    onEdit,
    onDelete,
    onSetDefault,
    onSetPublicPrivate,
}) => {
    if (!address) {
        return <div className="text-center">Address not found</div>
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="card-title">{address.name}</h3>
                        <p className="text-sm text-gray-500">{address.type}</p>
                        <div className="mt-4 space-y-2 lg:space-x-2">
                            {address.is_default && (
                                <div className="badge badge-primary badge-outline">
                                    Default
                                </div>
                            )}
                            {!address.is_default && (
                                <div className="badge badge-outline">
                                    Not Default
                                </div>
                            )}
                            {address.is_public ? (
                                <div className="badge badge-success badge-outline">
                                    Public
                                </div>
                            ) : (
                                <div className="badge badge-warning badge-outline">
                                    Private
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(address)}
                            className="btn btn-ghost btn-sm">
                            <PencilSimple size={20} />
                        </button>
                        <button
                            onClick={() => onDelete(address.uuid)}
                            className="btn btn-ghost btn-sm text-error">
                            <Trash size={20} />
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-medium">{address.line_1}</p>
                    {address.line_2 && <p>{address.line_2}</p>}
                    <p>{`${address.state}, ${address.country}`}</p>
                </div>

                {/* Badges for Default and Public Status */}

                {/* Buttons for toggling Default and Public Status */}
                <div className="mt-4 flex lg:flex-row flex-col justify-start gap-5">
                    <button
                        onClick={() => onSetDefault(address.uuid)}
                        className={`btn btn-sm ${
                            address.is_default
                                ? ' bg-base-100 btn-outline'
                                : ' bg-base-100 btn-primary btn-outline'
                        }`}>
                        {address.is_default
                            ? 'Already Default'
                            : 'Make Default'}
                    </button>
                    <button
                        onClick={() => onSetPublicPrivate(address.uuid)}
                        className={`btn btn-sm ${
                            address.is_public
                                ? 'btn-warning btn-outline'
                                : 'btn-success  btn-outline'
                        }`}>
                        {address.is_public ? 'Set as Private' : 'Set as Public'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddressCard
