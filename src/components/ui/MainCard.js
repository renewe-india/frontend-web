import { cn, ConditionalRender } from '@/lib/utils'
import React from 'react'

function MainCard({
    title,
    children,
    buttonName,
    setOpen,
    CardClassName,
    mainClassName,
}) {
    return (
        <div
            className={cn(
                'card bg-base-200 rounded-lg p-2 sm:p-5 shadow-md border-2 border-base-300',
                CardClassName,
            )}>
            <ConditionalRender condition={title}>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex-grow">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            {title}
                        </h2>
                        <div className="divider my-0" />
                    </div>
                    <ConditionalRender condition={buttonName && setOpen}>
                        <button
                            onClick={() => setOpen()}
                            className="btn btn-primary btn-sm ml-4">
                            {buttonName}
                        </button>
                    </ConditionalRender>
                </div>
            </ConditionalRender>
            {mainClassName ? (
                <div className={cn(mainClassName)}>{children}</div>
            ) : (
                children
            )}
        </div>
    )
}

export default MainCard
