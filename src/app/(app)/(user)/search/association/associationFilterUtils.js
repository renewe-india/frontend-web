'use client'

export function filterLabels(filter) {
    switch (filter.field) {
        case 'company_type':
            return `Company Type: ${filter.value}`
        case 'company_size':
            return `Company Size: ${filter.value}`
        case 'date_of_incorporation':
            return filter.operator === '>='
                ? `Incorporation After: ${filter.value}`
                : `Incorporation Before: ${filter.value}`
        default:
            return `${filter.field}: ${filter.value}`
    }
}
export const companyFilterConfig = [
    {
        label: 'Company Size',
        field: 'company_size',
        type: 'select',
        options: {
            '1-10-employees': '1-10 Employees',
            '11-100-employees': '11-100 Employees',
            '101-1000-employees': '101-1000 Employees',
            'more-than-1000-employees': 'More Than 1000 Employees',
        },
        placeholder: 'Select Company Size',
        operator: '=',
    },
    {
        label: 'Company Type',
        field: 'company_type',
        type: 'select',
        options: {
            'self-employed': 'Self Employed',
            'self-owned': 'Self Owned',
            partnership: 'Partnership',
            'privately-held': 'Privately Held',
            'publicly-held': 'Publicly Held',
            'government-agency': 'Government Agency',
        },
        placeholder: 'Select Company Type',
        operator: '=',
    },
    {
        label: 'Date of Incorporation (from)',
        field: 'date_of_incorporation_from',
        type: 'date',
        operator: '>=',
    },
    {
        label: 'Date of Incorporation (to)',
        field: 'date_of_incorporation_to',
        type: 'date',
        operator: '<=',
    },
]
