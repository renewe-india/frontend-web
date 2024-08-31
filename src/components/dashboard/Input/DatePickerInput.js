'use client'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Info } from '@phosphor-icons/react'

function DatePickerInput({
    labelTitle,
    labelDescription,
    defaultValue,
    containerStyle,
    labelStyle,
    updateType,
    updateFormValue,
    required = false,
}) {
    const [selectedDate, setSelectedDate] = useState(
        defaultValue ? new Date(defaultValue) : null,
    )

    const handleDateChange = date => {
        setSelectedDate(date)
        updateFormValue({
            updateType,
            value: date ? date.toISOString().split('T')[0] : '',
        })
    }

    return (
        <div className={`inline-block ${containerStyle}`}>
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

            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="input input-bordered w-full"
                placeholderText="Select a date"
                aria-label={labelTitle}
                required={required}
            />
        </div>
    )
}

export default React.memo(DatePickerInput)
