'use client'

import Image from '../Image'
import { cn } from '@/lib/utils'

export default function Avatar({
    avatarUrl,
    alt,
    size = 'md',
    isVerified = false,
}) {
    const sizes = {
        sm: 'p-px w-7 border',
        base: 'p-0.5 w-10 sm:w-12 border-2',
        md: 'p-1 w-12 sm:w-16 border-2',
        lg: 'p-1 w-16 sm:w-24 border-4',
        xl: 'p-1 w-24 sm:w-32 md:w-36 border-4',
    }

    const borderStyles = isVerified ? 'border-green-500' : 'border-base-100'

    return (
        <Image
            data={avatarUrl}
            alt={alt}
            className={cn(
                'avatar rounded-full flex-shrink-0 bg-base-300',
                sizes[size],
                borderStyles,
            )}
        />
    )
}
