import Image from '@/components/Image'
import PostHeader from '../card-actions/PostHeader'
import PostActions from '../card-actions/PostActions'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function NewsCardWithActions({
    article,
    sharedAt,
    authorType,
    comments,
    reactions,
    url,
}) {
    return (
        <NewsCardBasic
            article={article}
            sharedAt={sharedAt}
            authorType={authorType}>
            <PostActions reactions={reactions} comments={comments} url={url} />
        </NewsCardBasic>
    )
}

function NewsCardBasic({ article, authorType, sharedAt, children }) {
    return (
        <PostHeader
            author={article?.author}
            sharedAt={sharedAt}
            authorType={authorType}
            className={cn('flex flex-col')}>
            <Link
                href={`/news/${article?.slug}`}
                className={cn('mt-2 flex flex-col gap-2')}>
                <Image
                    data={article?.header}
                    alt={article?.headline}
                    customClass={cn('w-full h-full object-cover rounded-lg')}
                />

                <div className={cn('px-2 flex flex-col gap-4')}>
                    <h2 className={cn('text-2xl font-bold')}>
                        {article?.headline}
                    </h2>
                    <div>{article?.summary}</div>
                </div>
            </Link>
            {children}
        </PostHeader>
    )
}

export { NewsCardWithActions, NewsCardBasic }
