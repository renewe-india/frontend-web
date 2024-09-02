import React from 'react'
import dynamic from 'next/dynamic'
const CreateOrganizationForm = dynamic(() =>
    import('@/components/organization/CreateOrganizationForm'),
)
const ClaimableBusiness = dynamic(() => import('./ClaimableBusiness'))
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
