'use client'

import Image from '../Image'
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr'

export default function Avatar({
    avatarUrl,
    alt,
    size = 'md',
    isVerified = false,
    border = false,
    additionalClasses = '',
}) {
    const sizes = {
        sm: 'w-7',
        base: 'w-10',
        md: 'w-16',
        lg: 'w-24',
        xl: 'w-32',
    }

    const badgeSizes = {
        sm: 10,
        md: 20,
        lg: 28,
        xl: 28,
    }

    const borderStyles = border ? 'border-4 border-base-100' : ''

    return (
        <div
            className={`relative flex justify-center items-center ${additionalClasses}`}>
            <Image
                data={avatarUrl}
                alt={alt}
                className={`avatar rounded-full flex-shrink-0 ${sizes[size]} ${borderStyles}`}
            />
            {isVerified && (
                <ShieldCheck
                    size={badgeSizes[size]}
                    color="#00a400"
                    weight="duotone"
                    className="absolute -bottom-2 right-1/2 transform translate-x-1/2 bg-base-100 flex-shrink-0 rounded-full p-0.5"
                />
            )}
        </div>
    )
}
