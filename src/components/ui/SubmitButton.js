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
            {isSubmitting ? <Spinner spinColor="text-neutral" /> : children}

            {isSubmitting ? null : label && <span>{label}</span>}
        </button>
    )
}

export default SubmitButton
