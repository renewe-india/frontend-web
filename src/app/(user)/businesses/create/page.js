import React from 'react'
import CreateNewBusinessForm from './CreateNewBusinessForm'
import SearchBusiness from './SearchBusiness'
import ClaimableBusiness from './ClaimableBusiness'

const BusinessCreate = () => {
    return (
        <>
            <ClaimableBusiness />
            <SearchBusiness />
            <CreateNewBusinessForm />
        </>
    )
}

export default BusinessCreate
