import LoadMoreNews, { NoMoreArticles } from './LoadMoreNews'
import { NewsCardWithActions } from '@/components/cards/news/NewsCard'
import { getPaginatedData } from '@/actions/get-paginated-data'
import MainCard from '@/components/ui/MainCard'
import { ConditionalRender } from '@/lib/utils'

export const metadata = {
    title: 'News',
    description: 'The latest news and insights on the energy industry',
}

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
                    comments={article?.comments}
                    reactions={articles?.reactions}
                    url={`/news/articles/${article?.slug}`}
                />
            ))}
            <ConditionalRender condition={meta.last_page === 1}>
                <NoMoreArticles />
            </ConditionalRender>
            <ConditionalRender condition={meta.last_page !== 1}>
                <LoadMoreNews />
            </ConditionalRender>
        </div>
    )
}

export default NewsPage
