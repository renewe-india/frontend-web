import React from 'react'

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    customClass,
    required,
}) => {
    return (
        <div>
            <label className="pt-0 label label-text font-semibold">
                <span>{label}</span>
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={
                    `input input-primary w-full peer rounded` +
                    ' ' +
                    customClass
                }
                required={required}
            />
        </div>
    )
}

export default TextAreaField
