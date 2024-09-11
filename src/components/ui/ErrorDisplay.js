import { WarningCircle } from '@phosphor-icons/react'
import React from 'react'

const ErrorDisplay = ({ errors }) => {
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
                        <p className="text-xs font-semibold">Error - {error}</p>
                    </div>
                ))
            ) : (
                <div
                    role="alert"
                    className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105">
                    <WarningCircle size={24} className="flex-shrink-0 mr-2" />
                    <p className="text-xs font-semibold">Error - {errors}</p>
                </div>
            )}
        </div>
    )
}

export default ErrorDisplay
