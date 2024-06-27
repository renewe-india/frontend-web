'use client'
import axios from '@/lib/axios'
import React, { useState, useEffect } from 'react'
import BusinessShowCard from './BusinessShowCard'
import UpdateBusinessForm from './UpdateBusinessForm'
import Loading from '@/components/Loading'

async function fetchBusinessDetails(businessHandle) {
    let businessDetails = {}

    try {
        const response = await axios.get(`/api/businesses/${businessHandle}`)
        businessDetails = response.data.data
    } catch (error) {
        console.error('Error fetching business details:', error)
    }

    return businessDetails
}

const BusinessEdit = ({ params }) => {
    const businessHandle = params.business
    const [businessDetails, setBusinessDetails] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (businessHandle) {
            fetchBusinessDetails(businessHandle).then(details => {
                setBusinessDetails(details)
                setLoading(false)
            })
        }
    }, [businessHandle])

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
