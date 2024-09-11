import React from 'react'

const sessions = [
    {
        id: 1,
        location: 'Delhi, Delhi, India',
        device: 'Windows on Chrome',
        ip: '122.161.243.146',
        owner: 'Abts Delhi',
    },
    {
        id: 2,
        location: 'Mumbai, Maharashtra, India',
        device: 'Android',
        ip: '122.161.240.162',
        owner: 'Abts Mumbai',
        lastAccessed: '2 days ago',
    },
    {
        id: 3,
        location: 'Mumbai, Maharashtra, India',
        device: 'Android',
        ip: '122.161.240.162',
        owner: 'Abts Mumbai',
        lastAccessed: '2 days ago',
    },
]

const SessionHistory = () => {
    return (
        <div className="card bg-base-200 rounded-lg p-5 ">
            {/* Current Session */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Active Sessions</h2>
                <div className="divider my-0" />
                <p className="text-muted-foreground mb-4">
                    The locations listed below are an estimate of where the IP
                    address may be located within your country, region, and
                    city. The accuracy of the look-up varies by providers and
                    the location of the device. This should only be used as a
                    rough guideline.
                </p>

                <h3 className="text-lg font-medium mb-2">
                    You're signed in to {sessions.length} sessions
                </h3>

                <div className="mb-4">
                    <h4 className="font-semibold">Current Session</h4>
                    <div className="border border-border rounded-md p-4">
                        <p className="font-medium">Details</p>
                        <p>{sessions[0].location}</p>
                        <p className="text-muted-foreground">
                            (Approximate location)
                        </p>
                        <p>{sessions[0].device}</p>
                        <p className="font-medium">IP Address:</p>
                        <p>{sessions[0].ip}</p>
                        <p className="font-medium">IP Address Owner:</p>
                        <p>{sessions[0].owner}</p>
                    </div>
                </div>

                <h4 className="font-semibold">Other Active Sessions</h4>
                <button className="bg-primary text-white hover:bg-primary/80 mt-2 p-2 rounded-lg">
                    End these sessions
                </button>
            </div>

            {/* All Sessions */}
            {sessions.slice(1).map(session => (
                <div
                    key={session.id}
                    className="p-4 bg-card text-card-foreground rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Last Accessed</h2>
                        <a href="#" className="text-blue-500 hover:underline">
                            End
                        </a>
                    </div>

                    <div className="mt-4">
                        <p className="text-muted-foreground">
                            {session.lastAccessed}
                        </p>

                        <div className="mt-4">
                            <h3 className="text-md font-semibold">Details</h3>
                            <p className="text-muted-foreground">
                                {session.location}
                            </p>
                            <p className="text-muted-foreground">
                                (Approximate location)
                            </p>
                            <p className="text-muted-foreground">
                                {session.device}
                            </p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-md font-semibold">
                                Mobile Applications Using This Session
                            </h3>
                            <p className="text-muted-foreground">
                                {session.device.split(' on ')[0]} Mobile
                            </p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-md font-semibold">
                                IP Address:
                            </h3>
                            <p className="text-muted-foreground">
                                {session.ip}
                            </p>
                            <h3 className="text-md font-semibold">
                                IP Address Owner:
                            </h3>
                            <p className="text-muted-foreground">
                                {session.owner}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SessionHistory
