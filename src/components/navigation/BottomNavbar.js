'use client'
import { usePathname } from 'next/navigation'
import {
    Briefcase,
    Globe,
    Newspaper,
    Users,
    House,
} from '@phosphor-icons/react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

function BottomNavbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    const path = usePathname()
    const [currentPath, setCurrentPath] = useState('')

    useEffect(() => {
        setCurrentPath(path)
    }, [path])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset
            setVisible(
                prevScrollPos > currentScrollPos || currentScrollPos < 10,
            )
            setPrevScrollPos(currentScrollPos)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos])

    const getLinkClass = path =>
        cn(
            currentPath === path
                ? 'bg-base-300 text-success active'
                : 'text-gray-500 hover:bg-base-300',
        )

    return (
        <>
            <motion.div
                id="mobile-footer"
                className={cn(
                    'z-40 w-full text-xs btm-nav bg-inherit lg:hidden bottom-0 shadow-md',
                )}
                initial={{ y: 60 }}
                animate={{ y: visible ? 0 : 60 }}
                transition={{ duration: 0.3 }}>
                <Link href="/" className={getLinkClass('/')}>
                    <House size={24} stroke={2} weight="fill" />
                    Home
                </Link>
                <Link href="/network" className={getLinkClass('/network')}>
                    <Users size={24} stroke={2} weight="fill" />
                    Network
                </Link>
                <Link href="/news" className={getLinkClass('/news')}>
                    <Newspaper size={24} stroke={2} weight="fill" />
                    News
                </Link>
                <Link href="/meet" className={getLinkClass('/meet')}>
                    <Globe size={24} stroke={2} weight="fill" />
                    Meet
                </Link>
                <Link href="/jobs" className={getLinkClass('/jobs')}>
                    <Briefcase size={24} stroke={2} weight="fill" />
                    Jobs
                </Link>
            </motion.div>
        </>
    )
}

export default BottomNavbar
