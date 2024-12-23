import LoadMoreNews, { NoMoreArticles } from './LoadMoreNews'
import { NewsCardWithActions } from '@/components/cards/news/NewsCard'
import { getPaginatedData } from '@/actions/get-paginated-data'

const NewsPage = async () => {
    const { data: articles, meta } = await getPaginatedData(1, '/news/articles')

    return (
        <div className="space-y-5">
            {articles.map((article, index) => (
                <NewsCardWithActions key={index} article={article} />
            ))}
            {meta.last_page === 1 && <NoMoreArticles />}
            {meta.last_page !== 1 && <LoadMoreNews />}
        </div>
    )
}

export default NewsPage
