import React, { useState } from 'react'

const DescriptionWithToggle = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <p
            onClick={() => setIsExpanded(!isExpanded)}
            className={`transition-all duration-300 ${
                !isExpanded ? 'line-clamp-5' : 'line-clamp-none'
            } cursor-pointer`}>
            {description}
        </p>
    )
}

export default DescriptionWithToggle
