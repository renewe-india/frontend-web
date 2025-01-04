import React from 'react'
import { cn, ConditionalRender } from '@/lib/utils'

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
            <ConditionalRender condition={label}>
                <label className="pt-0 label label-text font-semibold">
                    <span>{label}</span>
                </label>
            </ConditionalRender>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(
                    'input input-primary w-full peer rounded',
                    customClass,
                )}
                required={required}
            />
        </div>
    )
}

export default TextAreaField
