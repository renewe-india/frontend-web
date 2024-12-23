import React from 'react'
import CurrentSession from './CurrentSession'
import OtherSessions from './OtherSessions'

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
        <>
            <CurrentSession sessions={sessions} />
            <OtherSessions sessions={sessions} />
        </>
    )
}

export default SessionHistory
