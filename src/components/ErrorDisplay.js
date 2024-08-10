import { WarningCircle } from '@phosphor-icons/react'
import React from 'react'

const ErrorDisplay = ({ errors }) => {
    return (
        <div className="text-red-500">
            {Array.isArray(errors) ? (
                errors.map((error, index) => (
                    <div key={index} className="flex items-center mb-1">
                        <WarningCircle
                            size={24}
                            className="flex-shrink-0 mr-2"
                        />
                        <p className="error-message">{error}</p>
                    </div>
                ))
            ) : (
                <div className="flex items-center">
                    <WarningCircle size={24} className="flex-shrink-0 mr-2" />
                    <p className="error-message">{errors}</p>
                </div>
            )}
        </div>
    )
}

export default ErrorDisplay
