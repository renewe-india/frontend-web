import LoadMoreNews, { NoMoreArticles } from './LoadMoreNews'
import { NewsCardWithActions } from '@/components/cards/news/NewsCard'
import { getPaginatedData } from '@/actions/get-paginated-data'
import MainCard from '@/components/ui/MainCard'

const NewsPage = async () => {
    const { data: articles, meta } = await getPaginatedData(1, '/news/articles')

    return (
        <>
            <MainCard CardClassName={'mb-2'}>
                <h2 className="text-2xl font-bold">Energy News & Insights</h2>
            </MainCard>
            <div className="space-y-2">
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
        </>
    )
}

export default NewsPage
