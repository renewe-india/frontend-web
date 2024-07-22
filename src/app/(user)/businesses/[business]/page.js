import ShowBusinessDetails from './ShowBusinessDetails'
import StockAvailable from './StockAvailable'

export const metadata = {
    title: 'Business Show',
}

export default function BusinessShow({ params }) {
    const businessHandle = params.business

    return (
        <>
            <ShowBusinessDetails businessHandle={businessHandle} />
            <StockAvailable />
        </>
    )
}
