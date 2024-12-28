import NetworkCard from '@/components/cards/NetworkCard'
import MainCard from '@/components/ui/MainCard'

export const metadata = {
    title: 'Network',
}

const Network = () => {
    return (
        <div className="space-y-2">
            <MainCard>
                <h2 className="text-2xl font-bold">Explore Your Network</h2>
            </MainCard>
            <MainCard CardClassName="grid grid-cols-2 sm:grid-cols-3">
                <NetworkCard /> <NetworkCard /> <NetworkCard />
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
                    <p className="mb-4 text-lg  text-gray-500 dark:text-gray-400" />
                </div>
            </MainCard>
        </div>
    )
}

export default Network
