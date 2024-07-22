import MangersTable from './MangersTable'
import axios from '@/lib/axios'
export const metadata = {
    title: 'Business Managers',
}

async function BusinessManagers({ params }) {
    const businessHandle = params.business

    return (
        <>
            <MangersTable businessHandle={businessHandle} />
        </>
    )
}

export default BusinessManagers
