import { formatDistanceToNow } from 'date-fns'
import Image from '@/components/Image'
import PostHeader from '@/components/cards/card-actions/PostHeader'
import PostActions from '@/components/cards/card-actions/PostActions'
import { getData } from '@/actions/getData'

const ArticlePage = async ({ params }) => {
    const slug = params.slug
    const { data: article } = await getData(`/news/articles/${slug}`)

    return (
        <>
            {article && (
                <PostHeader
                    author={article?.author}
                    sharedAt={formatDistanceToNow(
                        new Date(article?.published_at),
                    )}
                    className="m-5 space-y-4">
                    <Image
                        data={article?.header}
                        src="https://picsum.photos/1000/500"
                        alt={article.headline}
                        className="w-full cursor-pointer"
                    />
                    <div className="text-3xl font-bold ">
                        {article.headline}
                    </div>
                    <div className="text-xl font-bold">{article.summary}</div>
                    <div>{article.body}</div>
                    <PostActions
                        likes={article?.reactions_count}
                        comments={article?.comments_count}
                    />
                </PostHeader>
            )}
        </>
    )
}

export default ArticlePage
