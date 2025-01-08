import { getData } from '@/actions/getData'
import MangersTable from './MangersTable'
export const metadata = {
    title: 'Managers',
}

async function organizationManagers({ params }) {
    const organizationName = params.organization
    const { data: managers } = await getData(
        `/organizations/${organizationName}/managers`,
    )

    return (
        <MangersTable managers={managers} organizationName={organizationName} />
    )
}

export default organizationManagers
