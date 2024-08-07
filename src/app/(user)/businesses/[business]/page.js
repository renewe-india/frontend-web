import ShowBusinessDetails from './ShowBusinessDetails'
import StockAvailable from './StockAvailable'

export const metadata = {
    title: 'Business Show',
}

export default function BusinessShow({ params }) {
    const businessName = params.business

    return (
        <>
            <ShowBusinessDetails businessName={businessName} />
            <StockAvailable />
        </>
    )
}
