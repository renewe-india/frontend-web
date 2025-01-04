import React, { useState, useEffect } from 'react'
import Image from '@/components/Image'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import clsx from 'clsx'

function Carousel() {
    const images = [
        { src: 'https://picsum.photos/id/1018/1000/600', alt: 'Slide 1' },
        { src: 'https://picsum.photos/id/1025/1000/600', alt: 'Slide 2' },
        { src: 'https://picsum.photos/id/1039/1000/600', alt: 'Slide 3' },
        { src: 'https://picsum.photos/id/1050/1000/600', alt: 'Slide 4' },
        { src: 'https://picsum.photos/id/1060/1000/600', alt: 'Slide 5' },
    ]

    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextClick()
        }, 5000)

        return () => clearInterval(interval)
    }, [activeIndex])

    const handlePrevClick = () => {
        const newIndex = (activeIndex - 1 + images.length) % images.length
        setActiveIndex(newIndex)
    }

    const handleNextClick = () => {
        const newIndex = (activeIndex + 1) % images.length
        setActiveIndex(newIndex)
    }

    const goToSlide = index => {
        setActiveIndex(index)
    }

    return (
        <div
            id="default-carousel"
            className="relative w-full"
            data-carousel="slide">
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={clsx(
                            'duration-700 ease-in-out absolute inset-0 transition-opacity',
                            index === activeIndex ? 'opacity-100' : 'opacity-0',
                        )}
                        data-carousel-item>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            customClass="block w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${
                            index === activeIndex ? 'bg-white' : 'bg-gray-400'
                        }`}
                        aria-current={index === activeIndex ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
            {/* Slider controls */}
            <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={handlePrevClick}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <CaretLeft size={20} weight="bold" />
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={handleNextClick}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <CaretRight size={20} weight="bold" />
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    )
}

export default Carousel
