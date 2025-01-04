'use client'

import { useState } from 'react'
import { WarningCircle, X } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { cn, ConditionalRender } from '@/lib/utils'

export default function Popover({ message }) {
    const [isVisible, setIsVisible] = useState(true)
    const router = useRouter()

    const closePopover = () => {
        setIsVisible(false)

        const url = new URL(window.location)
        url.searchParams.delete('error')
        router.push(url.toString(), undefined, { shallow: true })
    }

    return (
        <ConditionalRender condition={message && isVisible}>
            <div
                className="fixed inset-0 flex justify-center items-center z-50"
                style={{ zIndex: 1000 }}>
                <div
                    role="alert"
                    className={cn(
                        'bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-4 rounded-lg flex items-center justify-between transition duration-300 ease-in-out transform hover:scale-105 shadow-lg',
                        { hidden: !isVisible },
                    )}
                    style={{
                        width: 'auto',
                        maxWidth: '500px',
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}>
                    <div className="flex items-center">
                        <WarningCircle
                            size={24}
                            className="flex-shrink-0 mr-2"
                        />
                        <p className="text-xs font-semibold">{message}</p>
                    </div>
                    <button
                        onClick={closePopover}
                        className="ml-2 p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-full">
                        <X size={16} />
                    </button>
                </div>
            </div>
        </ConditionalRender>
    )
}
