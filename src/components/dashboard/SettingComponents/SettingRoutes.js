import {
    AddressBook,
    At,
    BuildingOffice,
    Desk,
    House,
    SealCheck,
} from '@phosphor-icons/react'

const iconClasses = `h-6 w-6`

const routes = [
    {
        path: '/',
        icon: <House className={iconClasses} />,
        name: 'Home',
    },
    {
        path: 'profile',
        icon: <BuildingOffice className={iconClasses} />,
        name: 'Company Profile',
    },
    {
        path: 'managers',
        icon: <Desk className={iconClasses} />,
        name: 'Managers',
    },
    {
        path: 'contacts',
        icon: <AddressBook className={iconClasses} />,
        name: 'Contacts',
    },
    {
        path: 'verifications',
        icon: <SealCheck className={iconClasses} />,
        name: 'Verifications',
    },
    {
        path: 'addresses',
        icon: <At className={iconClasses} />,
        name: 'Addresses',
    },
]

export default routes
