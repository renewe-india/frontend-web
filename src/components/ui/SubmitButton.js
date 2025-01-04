import React from 'react'
import Spinner from './Spinner'
import { cn, ConditionalRender } from '@/lib/utils'

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
            className={cn(className, {
                'opacity-90 cursor-not-allowed': isSubmitting,
            })}
            disabled={isSubmitting || disabled}>
            <ConditionalRender condition={isSubmitting}>
                <Spinner spinColor="text-neutral" />
            </ConditionalRender>
            <ConditionalRender condition={!isSubmitting}>
                {label && <span>{label}</span>}
                {children}
            </ConditionalRender>
        </button>
    )
}

export default SubmitButton
