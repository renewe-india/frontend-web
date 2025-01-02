import React from 'react'

function MainCard({ title, children, buttonName, setOpen, CardClassName }) {
    return (
        <div
            className={
                'card bg-base-200 rounded-lg p-2 sm:p-5 shadow-md ' +
                `${CardClassName}`
            }>
            {title && (
                <div className="flex justify-between items-center mb-2">
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <div className="divider my-0" />
                    </div>
                    {buttonName && setOpen && (
                        <button
                            onClick={() => setOpen()}
                            className="btn btn-primary btn-sm ml-4">
                            {buttonName}
                        </button>
                    )}
                </div>
            )}
            {children}
        </div>
    )
}

export default MainCard
