import HeaderSection from '@/components/organization/publicView/HeaderSection'
import ShowAssociationDetails from './ShowAssociationDetails'
import { getData } from '@/actions/getData'
import MainCard from '@/components/ui/MainCard'

export async function generateMetadata({ params }) {
    const associationName = params.association
    return {
        title: `RenewE - ${associationName}`,
    }
}

export default async function AssociationShow({ params }) {
    const associationName = params.association

    const { data: associationDetails } = await getData(
        `/organizations/${associationName}`,
    )

    return (
        <MainCard CardClassName="flex flex-col gap-5">
            <HeaderSection organization={associationDetails} />
            <ShowAssociationDetails associationDetails={associationDetails} />
        </MainCard>
    )
}
