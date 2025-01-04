import React from 'react'
import ErrorDisplay from './ErrorDisplay'
import { cn, ConditionalRender } from '@/lib/utils'

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
            <ConditionalRender condition={label}>
                <label
                    className={cn(
                        'pt-0 label label-text font-semibold',
                        labelClassName,
                    )}>
                    <span>{label}</span>
                </label>
            </ConditionalRender>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(
                    className ? className : 'input input-primary w-full peer',
                )}
                required={required}
                {...props}
            />
            <ConditionalRender condition={error}>
                <ErrorDisplay errors={error} />
            </ConditionalRender>
        </>
    )
}

export default InputField
