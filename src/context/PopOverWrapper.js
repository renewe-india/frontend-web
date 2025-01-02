'use client'
import Popover from '@/components/ui/Popover'
import usePopover from '@/lib/showPopover'

export default function PopoverWrapper() {
    const errorMessage = usePopover()
    return errorMessage ? <Popover message={errorMessage} /> : null
}
