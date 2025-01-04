import React, { useState } from 'react'
import { cn, ConditionalRender } from '@/lib/utils'

const DescriptionWithToggle = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <ConditionalRender condition={description}>
            <p
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn('transition-all duration-300 cursor-pointer', {
                    'line-clamp-5': !isExpanded,
                    'line-clamp-none': isExpanded,
                })}>
                {description}
            </p>
        </ConditionalRender>
    )
}

export default DescriptionWithToggle
