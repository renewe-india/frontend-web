import Image from '@/components/Image'
import { getData } from '@/actions/getData'
import Link from 'next/link'
import PostActions from '@/components/cards/card-actions/PostActions'
import Avatar from '@/components/ui/AvatarImage'
import FollowButton from '@/components/ui/FollowButton'
import MoreOptions from './MoreOptions'
import MainCard from '@/components/ui/MainCard'
import EditorJsRenderer from '@/lib/utils/EditorJsRenderer'

const ArticlePage = async ({ params }) => {
    const slug = params.slug
    const { data: article } = await getData(`/news/articles/${slug}`)

    return (
        <>
            {article !== null ? (
                <article className="max-w-4xl mx-auto bg-base-200 rounded-lg shadow-lg overflow-hidden">
                    <div className="relative">
                        {/* Author section */}
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4 z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <Avatar
                                        avatarUrl={article?.author?.avatar}
                                        alt={article?.author?.name}
                                        size="base"
                                        isVerified={
                                            article?.author?.is_verified
                                        }
                                    />
                                    <div>
                                        <Link
                                            href={`/users/${article?.author?.username}`}
                                            className="font-semibold text-sm sm:text-base text-white hover:underline">
                                            {article?.author?.name}
                                        </Link>

                                        <div className="flex items-center gap-2">
                                            <p className="text-xs sm:text-sm text-gray-200">
                                                {
                                                    article?.published_at
                                                        ?.formatted
                                                }
                                            </p>
                                            {article?.author?.headline && (
                                                <span className="text-xs sm:text-sm text-gray-300">
                                                    ·{' '}
                                                    {article?.author?.headline}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FollowButton
                                        entityType={'users'}
                                        entityName={article?.author?.username}
                                        isFollowing={
                                            article?.author?.is_following
                                        }
                                        buttonStyle="glass text-base-100"
                                    />
                                    <MoreOptions />
                                </div>
                            </div>
                        </div>

                        {/* Header Image */}
                        <div className="aspect-[2/1] relative">
                            <Image
                                data={article?.header}
                                alt={article?.headline}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="p-6 space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
                                {article?.headline}
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                {article?.summary}
                            </p>
                        </div>

                        <div className="divider" />

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <EditorJsRenderer
                                content={JSON.parse(article?.body?.json)}
                            />
                        </div>

                        {/* Engagement Section */}
                        <PostActions
                            likes={article?.reactions}
                            comments={article?.comments}
                            url={`/news/articles/${article?.slug}`}
                        />

                        {/* Editor Attribution */}
                        {article?.editor && (
                            <div className="pt-6 border-t">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        avatarUrl={article?.editor?.avatar}
                                        alt={article?.editor?.name}
                                        size="sm"
                                        isVerified={
                                            article?.editor?.is_verified
                                        }
                                    />
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Edited by
                                        </p>
                                        <p className="font-medium">
                                            {article?.editor?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            ) : (
                <MainCard>
                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src="/errorCode/404.svg"
                            alt="No results found"
                            width={400}
                            height={400}
                        />
                        <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                            Hold tight! This article is not published yet!
                        </div>
                    </div>
                </MainCard>
            )}
        </>
    )
}

export default ArticlePage
