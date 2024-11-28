import { WarningCircle } from '@phosphor-icons/react'
import React from 'react'

const ErrorDisplay = ({ errors }) => {
    const renderError = error => {
        if (typeof error === 'string') {
            return error
        }
        if (typeof error === 'object' && error !== null) {
            return (
                <ul className="list-disc list-inside">
                    {Object.entries(error).map(([key, value], index) => (
                        <li key={index}>
                            <strong>{key}:</strong>{' '}
                            {typeof value === 'string'
                                ? value
                                : JSON.stringify(value)}
                        </li>
                    ))}
                </ul>
            )
        }
        return 'Unknown error'
    }

    return (
        <div className="text-red-500">
            {Array.isArray(errors) ? (
                errors.map((error, index) => (
                    <div
                        key={index}
                        role="alert"
                        className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105">
                        <WarningCircle
                            size={24}
                            className="flex-shrink-0 mr-2"
                        />
                        <p className="text-xs font-semibold">
                            Error - {renderError(error)}
                        </p>
                    </div>
                ))
            ) : (
                <div
                    role="alert"
                    className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105">
                    <WarningCircle size={24} className="flex-shrink-0 mr-2" />
                    <p className="text-xs font-semibold">
                        Error - {renderError(errors)}
                    </p>
                </div>
            )}
        </div>
    )
}

export default ErrorDisplay
