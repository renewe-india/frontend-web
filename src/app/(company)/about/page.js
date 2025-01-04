import Image from '@/components/Image'
import React from 'react'
import { cn } from '@/lib/utils'

function page() {
    const ReneweLogo = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_LOGO}`
    return (
        <div
            className={cn(
                'flex items-center justify-center min-h-screen relative',
            )}>
            <div
                className={cn('absolute inset-0 opacity-20 bg-repeat')}
                style={{
                    backgroundImage: 'url(/images/connect.svg)',
                    backgroundSize: '100px 100px',
                }}
            />
            <div className={cn('container mx-auto py-16 relative z-10')}>
                <div className={cn('bg-base-100 rounded-full p-8')}>
                    <div
                        className={cn('flex justify-center items-center mb-8')}>
                        <Image
                            src={ReneweLogo}
                            alt="Company Logo"
                            className={cn('h-5 lg:h-12 w-full')}
                        />
                    </div>
                    <section
                        className={cn(
                            'about-section text-center max-w-3xl mx-auto',
                        )}>
                        <h1 className={cn('text-5xl font-light mb-4')}>
                            About RenewE
                        </h1>
                        <p className={cn('text-lg')}>
                            Welcome to RenewE, a platform designed to connect
                            professionals in the renewable energy industry. Our
                            mission is to make the world a greener place by
                            offering innovative and eco-friendly energy products
                            and services.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default page
