import Image from '@/components/Image'
import PostHeader from '../card-actions/PostHeader'
import PostActions from '../card-actions/PostActions'
import Link from 'next/link'

const NewsCardWithActions = ({ article }) => {
    return (
        <NewsCardBasic article={article}>
            <PostActions
                likes={article?.reactions_count}
                comments={article?.comments_count}
            />
        </NewsCardBasic>
    )
}

const NewsCardBasic = ({ article, children }) => {
    return (
        <PostHeader author={article?.author} sharedAt="23 min ago">
            <div className="flex flex-col gap-2">
                <Link href={`/news/${article?.slug}`}>
                    <figure className="relative w-full aspect-video overflow-hidden">
                        <Image
                            data={article?.header}
                            alt={article?.headline}
                            customClass="absolute inset-0 w-full h-full object-contain"
                        />
                    </figure>
                    <div className="px-2 flex flex-col gap-2">
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
