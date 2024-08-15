import MangersTable from './MangersTable'
export const metadata = {
    title: 'Managers',
}

async function organizationManagers({ params }) {
    const organizationName = params.organization

    return (
        <>
            <MangersTable organizationName={organizationName} />
        </>
    )
}

export default organizationManagers
