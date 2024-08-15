import ShowBusinessDetails from './ShowBusinessDetails'

export const metadata = {
    title: 'Business Show',
}

export default function BusinessShow({ params }) {
    const businessName = params.business

    return (
        <>
            <ShowBusinessDetails businessName={businessName} />
        </>
    )
}
