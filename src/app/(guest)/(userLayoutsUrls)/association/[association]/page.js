import HeaderSection from '@/components/organization/publicView/HeaderSection'
import ShowAssociationDetails from './ShowAssociationDetails'
import axios from '@/lib/axios'

export async function generateMetadata({ params }) {
    const associationDetails = await fetchAssociationDetails(params.association)
    return {
        title: `Renewe - ${associationDetails.display_name}`,
    }
}

async function fetchAssociationDetails(associationName) {
    const response = await axios.get(`/organizations/${associationName}`)
    return response.data.data
}

export default async function AssociationShow({ params }) {
    const associationDetails = await fetchAssociationDetails(params.association)

    return (
        <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-5">
            <HeaderSection
                backdrop={associationDetails.backdrop?.url}
                logo={associationDetails.logo?.url}
                displayName={associationDetails?.display_name}
                tagline={associationDetails?.tagline}
                incorporationDate={associationDetails?.date_of_incorporation}
            />
            <ShowAssociationDetails associationDetails={associationDetails} />
        </div>
    )
}
