'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Plus } from '@phosphor-icons/react'
import axios from '@/lib/axios'

const fetchOrganizations = async type => {
    try {
        const response = await axios.get(`/api/my/${type}/organizations/list`)
        return response.data.data
    } catch (error) {
        console.error('Error fetching organizations:', error)
        throw error
    }
}

const truncateName = name => {
    const words = name.split(' ')
    return words.length > 2 ? `${words.slice(0, 2).join(' ')}...` : name
}

const OrganizationList = ({ type }) => {
    const [organizations, setOrganizations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getOrganizations = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchOrganizations(type)
                setOrganizations(data)
            } catch (err) {
                setError('Failed to load organizations.')
            } finally {
                setLoading(false)
            }
        }
        getOrganizations()
    }, [type])

    const createLink = useMemo(() => {
        switch (type) {
            case 'business':
                return '/businesses/create'
            case 'association':
                return '/associations/create'
            default:
                return `/${type}/create`
        }
    }, [type])

    if (loading) {
        return (
            <ul className="menu dropdown-content z-[1] bg-base-100">
                {[...Array(3)].map((_, index) => (
                    <li key={index}>
                        <div className="my-0.5 rounded-md whitespace-nowrap">
                            <div className="w-24 h-5 bg-gray-300 rounded animate-pulse" />
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <ul className="menu dropdown-content z-[1] bg-base-100">
            {organizations.map(org => (
                <li key={org.name}>
                    <Link
                        href={`/manage/${org.name}`}
                        className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap">
                        <img
                            src={org.logo.url}
                            className="h-5 w-5 overflow-hidden rounded"
                            alt={org.name}
                        />
                        <span>{truncateName(org.display_name)}</span>
                    </Link>
                </li>
            ))}
            <li>
                <Link
                    href={createLink}
                    className="my-0.5 hover:text-inherit rounded-md whitespace-nowrap">
                    <Plus size={24} stroke={2} />
                    Create New {type.charAt(0).toUpperCase() + type.slice(1)}
                </Link>
            </li>
        </ul>
    )
}

export default OrganizationList
