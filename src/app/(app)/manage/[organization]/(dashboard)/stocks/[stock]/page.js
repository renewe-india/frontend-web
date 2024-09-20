import React from 'react'
import UpdateStock from './UpdateStock'

async function fetchStockData() {
    // try {
    //const response = await axios.get(`/api/solar-stocks/${stockId}`)
    return {
        productName: 'Solar Panel X100',
        description: 'High-efficiency solar panel with a 300W output.',
        price: 249.99,
        quantity: 50,
        category: 'Panels',
        warehouseLocation: 'Warehouse A',
        batchNumber: 'B12345',
        expiryDate: '2025-12-31',
        supplierName: 'SolarTech Inc.',
        specifications: 'Monocrystalline, 18% efficiency, 60 cells',
    }
}
// catch (error) {
//     // Handle error as needed
//     return null
// }
// }

async function fetchCategoryOptions() {
    // Replace with your actual fetching logic
    return [
        { value: 'solar-panel', label: 'Solar Panel' },
        { value: 'solar-inverter', label: 'Solar Inverter' },
        { value: 'solar-battery', label: 'Solar Battery' },
        // Add more categories as needed
    ]
}

async function fetchWarehouseOptions() {
    // Replace with your actual fetching logic
    return [
        { value: 'warehouse-a', label: 'Warehouse A' },
        { value: 'warehouse-b', label: 'Warehouse B' },
        { value: 'warehouse-c', label: 'Warehouse C' },
        // Add more warehouse locations as needed
    ]
}

export default async function UpdatePage({ params }) {
    const { stock } = params
    const stockData = await fetchStockData(stock)
    const categoryOptions = await fetchCategoryOptions()
    const warehouseOptions = await fetchWarehouseOptions()
    return (
        <UpdateStock
            stock={stock}
            stockData={stockData}
            categoryOptions={categoryOptions}
            warehouseOptions={warehouseOptions}
        />
    )
}
