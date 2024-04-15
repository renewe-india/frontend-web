import React from 'react'

const ErrorDisplay = ({ errors }) => {
    return (
        <div className="text-red-500">
            {errors.map((error, index) => (
                <p key={index} className="error-message">
                    {error}
                </p>
            ))}
        </div>
    )
}

export default ErrorDisplay
