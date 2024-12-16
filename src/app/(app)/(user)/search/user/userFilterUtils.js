'use client'

export function filterLabels(filter) {
    switch (filter.field) {
        case 'gender':
            return `Gender: ${filter.value}`
        case 'date_of_birth':
            return `Date of Birth After: ${filter.value}`
        default:
            return `${filter.field}: ${filter.value}`
    }
}

export const userFilterConfig = [
    {
        label: 'Gender',
        field: 'gender',
        type: 'select',
        options: {
            male: 'Male',
            female: 'Female',
            other: 'Other',
        },
        placeholder: 'Select Gender',
        operator: '=',
    },
    {
        label: 'Date of Birth (after)',
        field: 'date_of_birth',
        type: 'date',
        operator: '>=',
    },
]
