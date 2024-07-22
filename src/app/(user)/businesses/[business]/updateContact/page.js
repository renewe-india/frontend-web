'use client'
import axios from '@/lib/axios'
import React, { useState, useEffect } from 'react'
import Loading from '@/components/Loading'
import UpdateContactForm from './UpdateContactForm'

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

function page({ params }) {
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
            <UpdateContactForm businessDetails={businessDetails} />
        </>
    )
}

export default page
