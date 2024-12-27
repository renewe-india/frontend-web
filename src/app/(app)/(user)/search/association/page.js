'use server'
import SearchPageComponent from '@/components/search-page/SearchPageComponent'
import { companyFilterConfig } from './associationFilterUtils'
import { Suspense } from 'react'
import Loading from '@/components/ui/Loading'

export default async function BusinessSearch() {
    return (
        <Suspense fallback={<Loading />}>
            <SearchPageComponent
                searchEndpoint="/organizations/search"
                defaultFilter={{
                    field: 'type',
                    operator: '=',
                    value: 'business',
                }}
                resultCard={'association'}
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
