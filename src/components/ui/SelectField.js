import React from 'react'

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder,
    required,
}) => {
    return (
        <div>
            <label className="pt-0 label label-text font-semibold">
                <span>{label}</span>
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="input input-primary w-full peer rounded"
                required={required}>
                <option disabled value="">
                    {placeholder}
                </option>
                {options.map((o, k) => (
                    <option value={o.value || k} key={k}>
                        {o.label || o.name}{' '}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField
