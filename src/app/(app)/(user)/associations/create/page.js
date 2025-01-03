import CreateOrganizationForm from '@/components/organization/CreateOrganizationForm'

export const metadata = {
    title: 'Association Create',
}

const AssociationCreate = () => {
    return <CreateOrganizationForm type="association" />
}

export default AssociationCreate
