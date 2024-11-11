import axios from '@/lib/axios'
import ContactSettings from './ContactSettings'

export default async function Contacts() {
    let countryCodes = []

    try {
        const response = await axios.get('/address/countries/isd-codes')
        countryCodes = response.data.data
    } catch (error) {
        // console.error('Failed to fetch country codes:', error)
    }

    return <ContactSettings countryCodes={countryCodes} />
}
