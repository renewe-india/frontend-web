import LoadMoreNews, { NoMoreArticles } from './LoadMoreNews'
import { NewsCardWithActions } from '@/components/cards/news/NewsCard'
import { getPaginatedData } from '@/actions/get-paginated-data'
import MainCard from '@/components/ui/MainCard'

const NewsPage = async () => {
    const { data: articles, meta } = await getPaginatedData(1, '/news/articles')

    return (
        <div className="space-y-2">
            <MainCard title={'Energy News & Insights'} />
            {articles.map((article, index) => (
                <NewsCardWithActions
                    key={index}
                    article={article}
                    sharedAt={article?.published_at}
                />
            ))}
            {meta.last_page === 1 && <NoMoreArticles />}
            {meta.last_page !== 1 && <LoadMoreNews />}
        </div>
    )
}

export default NewsPage
