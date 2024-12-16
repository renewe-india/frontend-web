'use server'
import SearchPageComponent from '@/components/search-page/SearchPageComponent'
import { filterLabels, userFilterConfig } from './userFilterUtils'
import Loading from '@/components/ui/Loading'
import { Suspense } from 'react'
export default async function UserSearch() {
    return (
        <Suspense fallback={<Loading />}>
            <SearchPageComponent
                searchEndpoint="/users/search"
                resultCard={'user'}
                filterLabels={filterLabels}
                filterConfig={userFilterConfig}
                sortOptions={[
                    { label: 'Name', field: 'name' },
                    { label: 'Username', field: 'username' },
                    { label: 'Gender', field: 'gender' },
                    { label: 'Date of Birth', field: 'date_of_birth' },
                ]}
            />
        </Suspense>
    )
}
