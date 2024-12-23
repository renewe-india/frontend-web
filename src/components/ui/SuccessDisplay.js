import { WarningCircle } from '@phosphor-icons/react'
import React from 'react'

function SuccessDisplay({ success }) {
    if (!success) {
        return null
    }
    return (
        <div
            role="alert"
            className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105">
            <WarningCircle size={24} className="flex-shrink-0 mr-2" />{' '}
            <p className="text-xs font-semibold">Success - {success}</p>
        </div>
    )
}

export default SuccessDisplay
