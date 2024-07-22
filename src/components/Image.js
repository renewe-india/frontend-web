import React from 'react'

function Image({ data, src, alt, customClass, ...props }) {
    return (
        <img
            src={src || (data && data.url) || ''}
            srcSet={src ? '' : (data && data.srcset) || ''}
            className={customClass || ''}
            alt={alt || ''}
            {...props}
        />
    )
}

export default Image
