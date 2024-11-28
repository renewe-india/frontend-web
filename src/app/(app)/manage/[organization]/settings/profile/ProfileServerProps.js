import axios from '@/lib/axios'

export async function getServerSideProps() {
    try {
        const sizeResponse = await axios.get('/enums/Main/CompanySize')
        const sizeData = sizeResponse.data.data
        const formattedSizeOptions = Object.entries(
            sizeData,
        ).map(([key, value]) => ({ value: key, name: value }))

        const typeResponse = await axios.get('/enums/Main/CompanyType')

        const typeData = typeResponse.data.data
        const formattedTypeOptions = Object.entries(
            typeData,
        ).map(([key, value]) => ({ value: key, name: value }))

        return {
            companySizeOptions: formattedSizeOptions,
            companyTypeOptions: formattedTypeOptions,
        }
    } catch (error) {
        return {
            companySizeOptions: [],
            companyTypeOptions: [],
        }
    }
}
