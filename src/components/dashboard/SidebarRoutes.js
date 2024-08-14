import { Briefcase, Newspaper, Package, Megaphone } from '@phosphor-icons/react'

const iconClasses = `h-6 w-6`

const routes = [
    {
        path: 'jobs',
        icon: <Briefcase className={iconClasses} />,
        name: 'Jobs',
    },
    {
        path: 'stocks',
        icon: <Package className={iconClasses} />,
        name: 'Product Stocks',
    },
    {
        path: 'newsletter',
        icon: <Newspaper className={iconClasses} />,
        name: 'Newsletter',
    },
    {
        path: 'advertise',
        icon: <Megaphone className={iconClasses} />,
        name: 'Advertise',
    },
]

export default routes
