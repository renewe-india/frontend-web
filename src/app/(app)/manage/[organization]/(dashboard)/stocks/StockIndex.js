'use client'
import TitleCard from '@/components/dashboard/Cards/TitleCard'
import { useOrganization } from '@/context/OrganizationContext'
import Link from 'next/link'
import React from 'react'

function StockIndex() {
    const organization = useOrganization()

    const stockData = [
        {
            id: 1,
            productName: 'Solar Panel 250W',
            sku: 'SP250W-2024',
            quantity: 80,
            imageUrl:
                'https://img.freepik.com/free-photo/solar-panels-roof-solar-cell_335224-1324.jpg?size=626&ext=jpg&ga=GA1.1.356158674.1716792734&semt=ais_hybrid',
            slug: 'solar-panel-250w',
        },
        {
            id: 2,
            productName: 'Lithium-Ion Battery 100Ah',
            sku: 'LIB100Ah-2024',
            quantity: 50,
            imageUrl:
                'https://img.freepik.com/free-photo/solar-panels-roof-solar-cell_335224-1324.jpg?size=626&ext=jpg&ga=GA1.1.356158674.1716792734&semt=ais_hybrid',
            slug: 'lithium-ion-battery-100ah',
        },
        {
            id: 3,
            productName: 'Grid-Tie Inverter 5kW',
            sku: 'GTI5kW-2024',
            quantity: 30,
            imageUrl:
                'https://img.freepik.com/free-photo/solar-panels-roof-solar-cell_335224-1324.jpg?size=626&ext=jpg&ga=GA1.1.356158674.1716792734&semt=ais_hybrid',
            slug: 'grid-tie-inverter-5kw',
        },
        {
            id: 4,
            productName: 'Solar Charge Controller 60A',
            sku: 'SCC60A-2024',
            quantity: 120,
            imageUrl:
                'https://img.freepik.com/free-photo/solar-panels-roof-solar-cell_335224-1324.jpg?size=626&ext=jpg&ga=GA1.1.356158674.1716792734&semt=ais_hybrid',
            slug: 'solar-charge-controller-60a',
        },
    ]

    return (
        <TitleCard
            title="Stock Management"
            topMargin="mt-2"
            TopSideButtonLink={{
                href: `/manage/${organization.name}/stocks/create`,
                text: 'Add New Stocks',
            }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stockData.map(stock => (
                    <div
                        key={stock.id}
                        className="card card-compact bg-base-100 w-auto shadow-xl">
                        <figure>
                            <img src={stock.imageUrl} alt={stock.productName} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{stock.productName}</h2>
                            <p>SKU: {stock.sku}</p>
                            <p>Quantity: {stock.quantity}</p>
                            <div className="card-actions justify-end">
                                <Link
                                    href={`/manage/${organization.name}/stocks/${stock.slug}`}
                                    className="btn btn-primary">
                                    Manage Stock
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </TitleCard>
    )
}

export default StockIndex
