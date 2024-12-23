import React from 'react'
import Spinner from './Spinner'

const SubmitButton = ({
    isSubmitting = false,
    label,
    onClick,
    type = 'submit',
    className = 'btn normal-case btn-primary',
    disabled = false,
    children,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${className} ${
                isSubmitting ? 'opacity-90 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting || disabled}>
            {isSubmitting ? null : children}
            <span>
                {label &&
                    (isSubmitting ? (
                        <Spinner spinColor="text-neutral" />
                    ) : (
                        label
                    ))}
            </span>
        </button>
    )
}

export default SubmitButton
