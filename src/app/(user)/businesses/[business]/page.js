import ShowBusinessDetails from './ShowBusinessDetails'

export const metadata = {
    title: 'Business Show',
}

export default function BusinessShow({ params }) {
    const businessHandle = params.business

    return (
        <>
            <ShowBusinessDetails businessHandle={businessHandle} />
        </>
    )
}
