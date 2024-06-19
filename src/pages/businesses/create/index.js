'use client'
import React, { useState } from 'react'
import CreateNewBusinessForm from './CreateNewBusinessForm'
import SearchBusiness from './SearchBusiness'
import ClaimableBusiness from './ClaimableBusiness'

const BusinessCreate = () => {
    const [createNewBusinessForm, setCreateNewBusinessForm] = useState(false)

    return (
        <>
            <ClaimableBusiness />
            <SearchBusiness
                setCreateNewBusinessForm={setCreateNewBusinessForm}
            />
            {createNewBusinessForm && <CreateNewBusinessForm />}
        </>
    )
}

export default BusinessCreate
