import {
    Briefcase,
    Newspaper,
    Package,
    Megaphone,
    ChartBar,
    Trophy,
    Calendar,
    House,
} from '@phosphor-icons/react'

const iconClasses = `h-6 w-6`

const routes = [
    {
        path: '/',
        icon: <House className={iconClasses} />,
        name: 'Home',
    },
    {
        path: 'jobs',
        icon: <Briefcase className={iconClasses} />,
        name: 'Jobs',
    },
    {
        path: 'stocks',
        icon: <Package className={iconClasses} />,
        name: 'Stocks',
    },
    {
        path: 'newsletter',
        icon: <Newspaper className={iconClasses} />,
        name: 'Newsletter',
    },
    {
        path: 'advertisements',
        icon: <Megaphone className={iconClasses} />,
        name: 'Advertisements',
    },
    {
        path: 'analytics',
        icon: <ChartBar className={iconClasses} />,
        name: 'Analytics',
    },
    {
        path: 'awards',
        icon: <Trophy className={iconClasses} />,
        name: 'Awards',
    },
    {
        path: 'events',
        icon: <Calendar className={iconClasses} />,
        name: 'Events',
    },
]

export default routes
