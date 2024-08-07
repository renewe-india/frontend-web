import CreateOrganizationForm from '@/components/CreateOrganizationForm'

export const metadata = {
    title: 'Association Create',
}

const AssociationCreate = () => {
    return (
        <>
            <CreateOrganizationForm type="association" />
        </>
    )
}

export default AssociationCreate
