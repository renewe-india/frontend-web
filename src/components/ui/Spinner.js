import React from 'react'

function Spinner({ spinColor = 'text-success', size }) {
    return <span className={`loading loading-spinner ${spinColor} ${size}`} />
}

export default Spinner
