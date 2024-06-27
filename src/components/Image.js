import React from 'react'

function Image({data, src, alt, customClass, ...props}) {

    return (
        <img
            src={src || data.url}
            srcSet={data.srcset || ''}
            className={customClass || ''}
            alt={alt}
            {props}
        />

    )
}

export default Image
