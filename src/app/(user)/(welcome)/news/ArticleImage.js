import { useState, useEffect } from 'react'
import { SkeletonImage } from '@/components/skeletons/NewsSkeleton'

const ArticleImage = ({ src }) => {
    const [loading, setLoading] = useState(true)
    const [timeout, setTimeoutState] = useState(false)

    useEffect(() => {
        if (src) {
            const timer = setTimeout(() => setTimeoutState(true), 2000)
            return () => clearTimeout(timer)
        }
    }, [src])

    if (!src) {
        return null
    }

    return (
        <>
            {loading && !timeout ? (
                <SkeletonImage />
            ) : (
                <img
                    src={src}
                    alt=""
                    className="w-24 h-24 rounded cursor-pointer"
                    onLoad={() => setLoading(false)}
                    onError={() => setLoading(false)} // Handle image load errors
                />
            )}
        </>
    )
}

export default ArticleImage
