import Image from '@/components/Image'
import PostHeader from '../card-actions/PostHeader'
import PostActions from '../card-actions/PostActions'
import Link from 'next/link'

function NewsCardWithActions({ article, sharedAt }) {
    return (
        <NewsCardBasic article={article} sharedAt={sharedAt}>
            <PostActions
                likes={article?.reactions}
                comments={article?.comments}
                url={`/news/articles/${article?.slug}`}
            />
        </NewsCardBasic>
    )
}

function NewsCardBasic({ article, sharedAt, children }) {
    return (
        <PostHeader author={article?.author} sharedAt={sharedAt}>
            <div className="flex flex-col">
                <Link
                    href={`/news/${article?.slug}`}
                    className="mt-2 flex flex-col gap-2">
                    <Image
                        data={article?.header}
                        alt={article?.headline}
                        customClass="w-full h-full object-cover rounded-lg"
                    />

                    <div className="px-2 flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">
                            {article?.headline}
                        </h2>
                        <div>{article?.summary}</div>
                    </div>
                </Link>
                {children}
            </div>
        </PostHeader>
    )
}

export { NewsCardWithActions, NewsCardBasic }
