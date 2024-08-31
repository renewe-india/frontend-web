'use client'
import { Info } from '@phosphor-icons/react'
import { useState } from 'react'

function InputText({
    labelTitle,
    labelStyle,
    labelDescription,
    type,
    containerStyle,
    defaultValue,
    placeholder,
    updateFormValue,
    updateType,
    required = false,
}) {
    const [value, setValue] = useState(defaultValue)

    const updateInputValue = val => {
        setValue(val)
        updateFormValue({ updateType, value: val })
    }

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            {labelTitle && (
                <label className={`label ${labelStyle}`}>
                    <span className="label-text">
                        {labelTitle}
                        {labelDescription && (
                            <div
                                className="tooltip tooltip-right"
                                data-tip={labelDescription}>
                                <Info className="w-4 h-4 ml-1" />
                            </div>
                        )}
                    </span>
                </label>
            )}
            <input
                type={type || 'text'}
                value={value}
                placeholder={placeholder || ''}
                onChange={e => updateInputValue(e.target.value)}
                className="input  input-bordered w-full "
                required={required}
            />
        </div>
    )
}

export default InputText
