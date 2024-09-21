import CreateOrganizationForm from '@/components/organization/CreateOrganizationForm'
// import dynamic from 'next/dynamic'

export const metadata = {
    title: 'Association Create',
}

// const ClaimableAssociations = dynamic(() => import('./ClaimableAssociations'))
const AssociationCreate = () => {
    return (
        <>
            {/* <ClaimableAssociations /> */}
            <CreateOrganizationForm type="association" />
        </>
    )
}

export default AssociationCreate
