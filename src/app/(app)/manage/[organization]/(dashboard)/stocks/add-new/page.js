import React from 'react'
import StockForm from './StockForm'

export default async function ProfileSettingsPage() {
    const categoryOptions = [
        { value: 'solar-panel', label: 'Solar Panel' },
        { value: 'solar-inverter', label: 'Solar Inverter' },
        { value: 'solar-battery', label: 'Solar Battery' },
        // Add more categories as needed
    ]

    const warehouseOptions = [
        { value: 'warehouse-a', label: 'Warehouse A' },
        { value: 'warehouse-b', label: 'Warehouse B' },
        { value: 'warehouse-c', label: 'Warehouse C' },
        // Add more warehouse locations as needed
    ]
    return (
        <div>
            <StockForm
                categoryOptions={categoryOptions}
                warehouseOptions={warehouseOptions}
            />
        </div>
    )
}
