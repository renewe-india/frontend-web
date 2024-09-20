import React from 'react'

const CurrentSession = ({ sessions }) => {
    return (
        <div className="card bg-base-200 rounded-lg p-5 ">
            {/* Current Session */}
            <div className="mb-4">
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

                <div className="mb-2 ">
                    <h4 className="font-semibold">Current Session</h4>
                    <div className="border border-border rounded-md p-4 mt-4 bg-base-100">
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
            </div>
        </div>
    )
}

export default CurrentSession
