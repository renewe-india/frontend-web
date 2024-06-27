import React from 'react'
import PropTypes from 'prop-types'

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

SubmitButton.propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    submittingLabel: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['submit', 'button']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
}

export default SubmitButton
