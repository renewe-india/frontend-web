import { Trash } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

function OtherSessions({ sessions }) {
    return (
        <div className="card bg-base-200 rounded-lg p-5 mt-2">
            {/* All Sessions */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Other Active Sessions</h2>
                <div className="divider my-0" />
                <button className="bg-primary text-white hover:bg-primary/80 mt-2 p-2 rounded-lg flex gap-2">
                    <Trash size={24} /> End these sessions
                </button>
            </div>
            {sessions.slice(1).map(session => (
                <div
                    key={session.id}
                    className="p-4 mt-2 bg-base-100 text-card-foreground rounded-lg border border-border shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Last Accessed</h2>
                        <a
                            href="#"
                            className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg">
                            <Trash size={24} />
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

export default OtherSessions
