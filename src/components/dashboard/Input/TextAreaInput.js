import { useState } from 'react'

function TextAreaInput({
    labelTitle,
    labelStyle,
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
            <label className="label">
                <span className={'label-text text-base-content ' + labelStyle}>
                    {labelTitle}
                </span>
            </label>
            <textarea
                value={value}
                className="textarea textarea-bordered w-full"
                placeholder={placeholder || ''}
                onChange={e => updateInputValue(e.target.value)}
                required={required}
            />
        </div>
    )
}

export default TextAreaInput
