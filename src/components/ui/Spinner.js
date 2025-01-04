import React from 'react'
import { cn } from '@/lib/utils'

function Spinner({ spinColor = 'text-success', size }) {
    return <span className={cn('loading loading-spinner', spinColor, size)} />
}

export default Spinner
