import HeaderSection from '@/components/organization/publicView/HeaderSection'
import ShowAssociationDetails from './ShowAssociationDetails'
import { getData } from '@/actions/getData'

export async function generateMetadata({ params }) {
    const associationName = params.association
    return {
        title: `Renewe - ${associationName}`,
    }
}

export default async function AssociationShow({ params }) {
    const associationName = params.association

    const { data: associationDetails } = await getData(
        `/organizations/${associationName}`,
    )

    return (
        <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-5">
            <HeaderSection organization={associationDetails} />
            <ShowAssociationDetails associationDetails={associationDetails} />
        </div>
    )
}
