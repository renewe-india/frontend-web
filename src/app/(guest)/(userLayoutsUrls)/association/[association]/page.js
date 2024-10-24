import ShowAssociationDetails from './ShowAssociationDetails'

export const metadata = {
    title: 'Association Show',
}

export default function AssociationShow({ params }) {
    const associationName = params.association

    return (
        <>
            <ShowAssociationDetails associationName={associationName} />
        </>
    )
}
