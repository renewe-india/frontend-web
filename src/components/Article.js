import { useState, useEffect } from 'react'
import useAuth from '@/hooks/auth'

const Article = ({ articleId }) => {
    const { getArticle } = useAuth()
    const [articleData, setArticleData] = useState(null)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getArticle(articleId)
                setArticleData(data)
            } catch (error) {
                console.error('Error fetching article data:', error)
            }
        }
        fetchArticle()
    }, [articleId, getArticle])

    return (
        <div className="flex gap-2">
            {articleData && (
                <div className="mx-7">
                    <img
                        src={articleData.image}
                        alt=""
                        className="w-full cursor-pointer"
                    />
                    <h2 className="text-xl font-bold">
                        {articleData.headline}
                    </h2>
                    <div>{articleData.summary}</div>
                </div>
            )}
        </div>
    )
}

export default Article
