import React from 'react'

function Background({ background, customClass }) {
    const hasBackground = background && background.url

    return (
        <img
            srcSet={hasBackground ? background.srcset : ''}
            src={hasBackground ? background.url : '/images/backdrop.svg'}
            alt={hasBackground ? 'background' : 'Default Background'}
            className={customClass || ''}
        />
    )
}

export default Background
