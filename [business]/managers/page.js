import MangersTable from './MangersTable'
export const metadata = {
    title: 'Business Managers',
}

async function BusinessManagers({ params }) {
    const businessName = params.business

    return (
        <>
            <MangersTable businessName={businessName} />
        </>
    )
}

export default BusinessManagers
