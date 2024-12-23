import ShowBusinessDetails from './ShowBusinessDetails'
import HeaderSection from '@/components/organization/publicView/HeaderSection'
import { getData } from '@/actions/getData'

export async function generateMetadata({ params }) {
    return {
        title: `Renewe - ${params.business}`,
    }
}

export default async function BusinessShow({ params }) {
    const businessName = params.business
    const { data: businessDetails } = await getData(
        `/organizations/${businessName}`,
    )

    return (
        <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-5">
            <HeaderSection organization={businessDetails} />
            <ShowBusinessDetails businessDetails={businessDetails} />
        </div>
    )
}
