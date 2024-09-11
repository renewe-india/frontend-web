import React from 'react'

const SubmitButton = ({
    isSubmitting,
    label,
    submittingLabel,
    onClick,
    type = 'submit',
    className = 'btn normal-case btn-primary',
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${className} ${
                isSubmitting ? 'opacity-90 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting || disabled}>
            <span>{isSubmitting ? submittingLabel : label}</span>
        </button>
    )
}

export default SubmitButton
