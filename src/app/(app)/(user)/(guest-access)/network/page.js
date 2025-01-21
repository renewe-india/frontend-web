import NetworkCard from '@/components/cards/NetworkCard'
import MainCard from '@/components/ui/MainCard'

export const metadata = {
    title: 'Network',
    description: 'Explore your network and connect with other professionals',
}

const Network = () => {
    const user = {
        name: 'Melissa Gerhold DDS',
        username: 'cf601a7a-0ffd-43ee-81d7-4a7bef2ca8e1',
        headline: 'Global Branding Officer at Kessler, Kessler and Kessler',
        is_verified: true,
        is_following: false,
        followed_by: {
            count: 26,
            abbreviate_count: '26',
            text: 'Mr. Tremaine Parisian Jr., Jay Grant and 24 others',
        },
        avatar: {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/placeholder/user.svg`,
            srcset: null,
        },
    }
    return (
        <div className="space-y-2">
            <MainCard
                title={'Explore Your Network'}
                mainClassName="grid grid-cols-2 sm:grid-cols-3 gap-2 ">
                <NetworkCard entity={user} /> <NetworkCard entity={user} />
                <NetworkCard entity={user} /> <NetworkCard entity={user} />
            </MainCard>
            <MainCard>
                <div className="flex flex-col items-center justify-center text-center">
                    <img
                        src="/notFound/network-not-found.svg"
                        alt="No results found"
                        width={400}
                        height={400}
                    />

                    <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                        The network is quiet right now. Check back soon for
                        updates.
                    </div>
                    <p className="mb-4 text-lg text-gray-500 dark:text-gray-400" />
                </div>
            </MainCard>
        </div>
    )
}

export default Network
