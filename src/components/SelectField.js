import React from 'react'

const SelectField = ({ label, name, value, onChange, options, required }) => {
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
                <option value="">Select Type</option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField
