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
                url={`/news/articles/${article?.slug}/comments`}
            />
        </NewsCardBasic>
    )
}

function NewsCardBasic({ article, sharedAt, children }) {
    return (
        <PostHeader author={article?.author} sharedAt={sharedAt}>
            <div className="flex flex-col gap-2">
                <Link href={`/news/${article?.slug}`}>
                    <figure className="relative w-full aspect-video overflow-hidden">
                        <Image
                            data={article?.header}
                            alt={article?.headline}
                            customClass="absolute inset-0 w-full h-full object-contain"
                        />
                    </figure>
                    <div className="px-2 mt-5 flex flex-col gap-2">
                        <h2 className="text-xl font-bold">
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
