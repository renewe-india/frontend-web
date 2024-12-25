import React from 'react'
import ErrorDisplay from './ErrorDisplay'

const InputField = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    required,
    labelClassName,
    className,
    error,
    props,
}) => {
    return (
        <>
            {label && (
                <label
                    className={
                        'pt-0 label label-text font-semibold' +
                        ' ' +
                        `${labelClassName}`
                    }>
                    <span>{label}</span>
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={
                    className
                        ? `${className}`
                        : 'input input-primary w-full peer '
                }
                required={required}
                {...props}
            />
            {error && <ErrorDisplay errors={error} />}
        </>
    )
}

export default InputField
