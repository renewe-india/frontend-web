import { Pencil } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

const OrganizationAddressTable = ({ addresses, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th />
                        <th>Location</th>
                        <th>Contact Person</th>

                        <th>Phone</th>
                        <th>Address</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map((address, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{address.location}</td>
                            <td>{address.contactPerson}</td>

                            <td>{address.phone}</td>
                            <td>{address.address}</td>
                            <td>
                                <button
                                    className="btn btn-xs text-primary hover:text-white hover:btn-primary"
                                    onClick={() => onEdit(address)}>
                                    <Pencil size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th />
                        <th>Location</th>
                        <th>Contact Person</th>

                        <th>Phone</th>
                        <th>Address</th>
                        <th>Edit</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default OrganizationAddressTable
