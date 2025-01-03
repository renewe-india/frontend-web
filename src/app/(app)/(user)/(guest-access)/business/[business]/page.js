import ShowBusinessDetails from './ShowBusinessDetails'
import HeaderSection from '@/components/organization/publicView/HeaderSection'
import { getData } from '@/actions/getData'
import MainCard from '@/components/ui/MainCard'

export async function generateMetadata({ params }) {
    return {
        title: `RenewE - ${params.business}`,
    }
}

export default async function BusinessShow({ params }) {
    const businessName = params.business
    const { data: businessDetails } = await getData(
        `/organizations/${businessName}`,
    )

    return (
        <MainCard CardClassName="flex flex-col gap-5">
            <HeaderSection organization={businessDetails} />
            <ShowBusinessDetails businessDetails={businessDetails} />
        </MainCard>
    )
}
