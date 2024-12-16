import axios from '@/lib/axios'
import ShowBusinessDetails from './ShowBusinessDetails'
import HeaderSection from '@/components/organization/publicView/HeaderSection'

export async function generateMetadata({ params }) {
    const businessDetails = await fetchBusinessDetails(params.business)
    return {
        title: `Renewe - ${businessDetails.display_name}`,
    }
}

async function fetchBusinessDetails(businessName) {
    const response = await axios.get(`/organizations/${businessName}`)
    return response.data.data
}

export default async function BusinessShow({ params }) {
    const businessDetails = await fetchBusinessDetails(params.business)

    return (
        <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-5">
            <HeaderSection
                backdrop={businessDetails.backdrop?.url}
                logo={businessDetails.logo?.url}
                displayName={businessDetails?.display_name}
                tagline={businessDetails?.tagline}
                incorporationDate={businessDetails?.date_of_incorporation}
            />
            <ShowBusinessDetails businessDetails={businessDetails} />
        </div>
    )
}
