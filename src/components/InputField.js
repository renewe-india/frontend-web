import React from 'react'

const InputField = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    required,
}) => {
    return (
        <div>
            <label className="pt-0 label label-text font-semibold">
                <span>{label}</span>
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input input-primary w-full peer rounded"
                required={required}
            />
        </div>
    )
}

export default InputField
