'use client'
import React, { useState, useEffect } from 'react'
import MainSearchDropdown from './MainSearchDropdown'
import FeedCard from '@/components/cards/Feed/FeedCard'
import CreatePost from './CreatePost'

const Home = () => {
    const [isLoading, setIsLoading] = useState(true)

    const posts = [
        {
            id: 1,
            authorName: 'John Doe',
            authorImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            postTime: '2 hours ago',
            title: 'Exploring the Wonders of Nature',
            description:
                'A look into the most beautiful landscapes and wildlife on Earth. From towering mountains to deep forests, there is so much to explore. The diversity of nature is truly astounding, and there are so many hidden gems waiting to be discovered by those who venture off the beaten path. Whether it’s the vast plains of Africa or the icy expanse of Antarctica, nature offers something for everyone to experience and cherish.',
            image: 'https://picsum.photos/300/150?random=1',
            likes: 120,
            comments: 34,
            reposts: 12,
        },
        {
            id: 2,
            authorName: 'Jane Smith',
            authorImage: 'https://randomuser.me/api/portraits/women/1.jpg',
            postTime: '4 hours ago',
            title: 'The Art of Photography',
            description:
                'Tips and tricks for capturing stunning photos, from lighting to framing, perfect for beginners and experts alike. Understanding the basics of photography is essential, but mastering the art requires a keen eye for composition and an understanding of light. Whether you’re shooting landscapes, portraits, or action shots, each type of photography has its own challenges and rewards. Great photographers know how to use the camera’s settings to bring their vision to life, and they also know when to step back and let the natural beauty of the moment take center stage.',
            image: 'https://picsum.photos/300/200?random=1',
            likes: 89,
            comments: 19,
            reposts: 7,
        },
        {
            id: 3,
            authorName: 'Alice Johnson',
            authorImage: 'https://randomuser.me/api/portraits/women/2.jpg',
            postTime: '1 day ago',
            title: 'The Journey of Self-Discovery',
            description:
                'The journey of self-discovery is one of the most important and transformative experiences a person can undergo. It’s about learning who you truly are, understanding your values, and finding the courage to live authentically. Throughout life, we often find ourselves trying to meet the expectations of others or following paths that don’t truly align with our passions. However, once we begin to listen to our inner voice and trust ourselves, we open the door to endless possibilities and the potential for personal growth.',
            image: 'https://picsum.photos/300/250?random=2',
            likes: 230,
            comments: 52,
            reposts: 18,
        },
        {
            id: 4,
            authorName: 'Michael Brown',
            authorImage: 'https://randomuser.me/api/portraits/men/2.jpg',
            postTime: '3 days ago',
            title: 'Innovations in Technology and Their Impact on Society',
            description:
                'Technology has been one of the driving forces behind the evolution of society, with innovations pushing the boundaries of what we can achieve. From the rise of the internet and artificial intelligence to advancements in robotics and renewable energy, technology is constantly reshaping the way we live, work, and communicate. These innovations bring both challenges and opportunities, and while they have the potential to improve lives, they also raise important questions about privacy, security, and the ethical implications of these new tools. As we continue to innovate, it’s essential to consider the long-term impact of these advancements on individuals and society as a whole.',
            image: 'https://picsum.photos/300/300?random=3',
            likes: 145,
            comments: 61,
            reposts: 22,
        },
        {
            id: 5,
            authorName: 'Ethan Williams',
            authorImage: 'https://randomuser.me/api/portraits/men/3.jpg',
            postTime: '5 days ago',
            title: 'The Importance of Mental Health Awareness',
            description:
                'Mental health has long been a topic that has been shrouded in stigma, with many people feeling ashamed to talk about their struggles or seek help. However, in recent years, there has been a growing movement to increase awareness and reduce the stigma surrounding mental health. Mental health affects everyone, regardless of age, gender, or background, and it’s essential to recognize the importance of taking care of our emotional and psychological well-being. From stress management to overcoming anxiety and depression, there are numerous resources and strategies available to support individuals on their journey toward mental wellness.',
            image: 'https://picsum.photos/300/350?random=4',
            likes: 175,
            comments: 42,
            reposts: 14,
        },
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="space-y-2">
            <MainSearchDropdown />
            <CreatePost />
            <FeedCard posts={posts} isLoading={isLoading} />
        </div>
    )
}

export default Home
