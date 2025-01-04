import React from 'react'
import { cn, ConditionalRender } from '@/lib/utils'

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
        <>
            <ConditionalRender condition={label}>
                <label className={cn('pt-0 label label-text font-semibold')}>
                    <span>{label}</span>
                </label>
            </ConditionalRender>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={cn('select select-primary w-full')}
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
        </>
    )
}

export default SelectField
