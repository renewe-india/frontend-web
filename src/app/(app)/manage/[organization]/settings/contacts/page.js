import ContactSettings from './ContactSettings'
import { getData } from '@/actions/getData'

export default async function Contacts({ params }) {
    const { organization } = params
    const { data: countryCodes } = await getData('/address/countries/isd-codes')
    const { data: contactsData } = await getData(
        `/organizations/${organization}/contacts`,
    )

    return (
        <ContactSettings
            organization={organization}
            contactsData={contactsData}
            countryCodes={countryCodes}
        />
    )
}
