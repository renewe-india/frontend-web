'use client'
import axios from '@/lib/axios'
import React, { useState, useEffect } from 'react'
import BusinessShowCard from './BusinessShowCard'
import UpdateBusinessForm from './UpdateBusinessForm'
import Loading from '@/components/Loading'

async function fetchBusinessDetails(businessName) {
    let businessDetails = {}

    try {
        const response = await axios.get(`/api/organizations/${businessName}`)
        businessDetails = response.data.data
    } catch (error) {
        // console.error('Error fetching business details:', error)
    }

    return businessDetails
}

const BusinessEdit = ({ params }) => {
    const businessName = params.business
    const [businessDetails, setBusinessDetails] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (businessName) {
            fetchBusinessDetails(businessName).then(details => {
                setBusinessDetails(details)
                setLoading(false)
            })
        }
    }, [businessName])

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <BusinessShowCard businessDetails={businessDetails} />
            <UpdateBusinessForm businessDetails={businessDetails} />
        </>
    )
}

export default BusinessEdit
