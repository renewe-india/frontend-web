export const metadata = {
    title: 'Network',
}

const Network = () => {
    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5">
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
            </div>
        </>
    )
}

export default Network
