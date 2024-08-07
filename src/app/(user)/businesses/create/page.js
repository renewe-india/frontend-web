import React from 'react'
import ClaimableBusiness from './ClaimableBusiness'
import CreateOrganizationForm from '@/components/CreateOrganizationForm'

const BusinessCreate = () => {
    // const [createNewBusinessForm, setCreateNewBusinessForm] = useState(false)

    return (
        <>
            <ClaimableBusiness />
            {/* <SearchBusiness
                setCreateNewBusinessForm={setCreateNewBusinessForm}
            /> */}
            {/* {createNewBusinessForm && <CreateNewBusinessForm />} */}
            <CreateOrganizationForm type="business" />
        </>
    )
}

export default BusinessCreate
