'use server'
import SearchPageComponent from '@/components/search-page/SearchPageComponent'
import { companyFilterConfig } from './businessFilterUtils'
import Loading from '@/components/ui/Loading'
import { Suspense } from 'react'

export default async function BusinessSearch() {
    return (
        <Suspense fallback={<Loading />}>
            <SearchPageComponent
                searchEndpoint={`organizations/type/business/search`}
                resultName={'Businesses'}
                resultCard={'organization'}
                filterConfig={companyFilterConfig}
                sortOptions={[
                    { label: 'Company Size', field: 'company_size' },
                    { label: 'Company Type', field: 'company_type' },
                    { label: 'Date of Inc.', field: 'date_of_incorporation' },
                ]}
            />
        </Suspense>
    )
}
