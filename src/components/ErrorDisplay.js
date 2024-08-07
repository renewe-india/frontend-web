import React from 'react'

const ErrorDisplay = ({ errors }) => {
    return (
        <div className="text-red-500">
            <p className="error-message">{errors}</p>
        </div>
    )
}

export default ErrorDisplay
