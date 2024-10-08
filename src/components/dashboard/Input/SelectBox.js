import React, { memo, useState } from 'react'
import { Info } from '@phosphor-icons/react'

function SelectBox({
    labelTitle,
    labelDescription,
    defaultValue,
    containerStyle,
    placeholder = 'Select an option',
    labelStyle,
    options = [],
    updateType,
    updateFormValue,
    required = false,
}) {
    const [value, setValue] = useState(defaultValue || '')

    const updateValue = newValue => {
        setValue(newValue)
        if (updateFormValue) {
            updateFormValue({ updateType, value: newValue })
        }
    }

    return (
        <div className={`inline-block ${containerStyle}`}>
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

            <select
                className="select select-bordered w-full"
                value={value}
                onChange={e => updateValue(e.target.value)}
                aria-label={labelTitle}
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

export default memo(SelectBox)
