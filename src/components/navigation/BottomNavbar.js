'use client'
import { usePathname } from 'next/navigation'
import {
    Article,
    Briefcase,
    BriefcaseMetal,
    Confetti,
    GlobeStand,
    Newspaper,
    PlusSquare,
    Users,
    Envelope,
} from '@phosphor-icons/react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function BottomNavbar() {
    const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    const path = usePathname()
    const [currentPath, setCurrentPath] = useState('')

    // Check if it's mobile screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setCurrentPath(path)
    }, [path])

    useEffect(() => {
        if (!isMobile) return

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset
            setVisible(
                prevScrollPos > currentScrollPos || currentScrollPos < 10,
            )
            setPrevScrollPos(currentScrollPos)
            if (!visible) {
                setIsBottomDrawerOpen(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos, isMobile])

    if (!isMobile) return null

    const getLinkClass = path => {
        return currentPath && currentPath.includes(path)
            ? 'flex flex-col items-center p-2 hover:bg-gray-400 bg-base-300 text-success'
            : 'flex flex-col items-center p-2 hover:bg-base-300'
    }

    return (
        <>
            {/* Drawer Buttons: This will show when Post is clicked */}
            <motion.div
                className={`mb-14 transform left-0 fixed w-full overflow-auto ease-in-out transition-all duration-300 z-10 border-t ${
                    isBottomDrawerOpen
                        ? 'translate-y-0 bottom-0'
                        : 'translate-y-full -bottom-14'
                }`}
                initial={{ y: 120 }}
                animate={{ y: isBottomDrawerOpen ? 0 : 120 }}
                transition={{ duration: 0.3 }}>
                <div className="p-2 grid grid-cols-2 gap-2 bg-base-100 ">
                    <button
                        type="button"
                        className="btn normal-case btn-outline">
                        <span className="block">
                            <Envelope size={24} stroke={2} />
                        </span>
                        Message
                    </button>
                    <button
                        type="button"
                        className="btn normal-case btn-outline">
                        <span className="block">
                            <Article size={24} stroke={2} />
                        </span>
                        Article
                    </button>
                    <button
                        type="button"
                        className="btn normal-case btn-outline">
                        <span className="block">
                            <Confetti size={24} stroke={2} />
                        </span>
                        Celebration
                    </button>
                    <button
                        type="button"
                        className="btn normal-case btn-outline">
                        <span className="block">
                            <BriefcaseMetal size={24} stroke={2} />
                        </span>
                        Buy Request
                    </button>
                </div>
            </motion.div>

            {/* Mobile Footer */}
            <motion.div
                id="mobile-footer"
                className="fixed z-40 w-full text-xs grid grid-cols-5 bg-inherit lg:hidden items-center bottom-0 text-theme-dark dark:text-theme-light shadow dark:shadow-white"
                initial={{ y: 60 }}
                animate={{ y: visible ? 0 : 60 }}
                transition={{ duration: 0.3 }}>
                <Link href="/network" className={getLinkClass('network')}>
                    <Users size={24} stroke={2} />
                    Network
                </Link>
                <Link href="/news" className={getLinkClass('news')}>
                    <Newspaper size={24} stroke={2} />
                    News
                </Link>
                {/* Post Button to Toggle Drawer */}
                <button
                    onClick={() => setIsBottomDrawerOpen(!isBottomDrawerOpen)}
                    className="flex flex-col items-center p-2 hover:bg-base-300">
                    <PlusSquare size={24} stroke={2} />
                    Post
                </button>
                <Link href="/events" className={getLinkClass('events')}>
                    <GlobeStand size={24} stroke={2} />
                    Events
                </Link>
                <Link href="/jobs" className={getLinkClass('jobs')}>
                    <Briefcase size={24} stroke={2} />
                    Jobs
                </Link>
            </motion.div>
        </>
    )
}

export default BottomNavbar
