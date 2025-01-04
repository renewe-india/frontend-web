'use client'

import Image from '../Image'
import { cn, ConditionalRender } from '@/lib/utils'

export default function OrganizationLogo({
    LogoUrl,
    alt,
    size = 'md',
    isVerified = false,
}) {
    const sizes = {
        sm: 'p-px w-7 rounded-xl border',
        base: 'p-0.5 w-10 sm:w-12 rounded-xl border-2',
        md: 'p-1 w-12 sm:w-16 rounded-xl border-2',
        lg: 'p-1 w-16 sm:w-24 rounded-xl border-2',
        xl: 'p-1 w-24 sm:w-32 md:w-36 rounded-2xl border-2',
    }

    const borderStyles = isVerified ? 'border-green-500' : 'border-base-100'

    return (
        <ConditionalRender condition={LogoUrl}>
            <Image
                data={LogoUrl}
                alt={alt}
                className={cn(
                    'avatar flex-shrink-0 bg-base-300',
                    sizes[size],
                    borderStyles,
                )}
            />
        </ConditionalRender>
    )
}
