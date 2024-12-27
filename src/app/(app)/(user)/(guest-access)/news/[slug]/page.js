import Image from '@/components/Image'
import { getData } from '@/actions/getData'
import Link from 'next/link'
import PostActions from '@/components/cards/card-actions/PostActions'
import Avatar from '@/components/ui/AvatarImage'
import FollowButton from '@/components/ui/FollowButton'
import MoreOptions from './MoreOptions'

const ArticlePage = async ({ params }) => {
    const slug = params.slug
    const { data: article } = await getData(`/news/articles/${slug}`)

    return (
        <>
            {article && (
                <article className="max-w-4xl mx-auto bg-base-200 rounded-lg shadow-lg overflow-hidden">
                    <div className="relative">
                        {/* Author section */}
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4 z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        avatarUrl={article?.author?.avatar}
                                        alt={article?.author?.name}
                                        size="md"
                                        isVerified={
                                            article?.author?.is_verified
                                        }
                                        border={true}
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/users/${article?.author?.username}`}
                                                className="font-semibold text-white hover:underline">
                                                {article?.author?.name}
                                            </Link>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-200">
                                                {
                                                    article?.published_at
                                                        ?.formatted
                                                }
                                            </p>
                                            {article?.author?.headline && (
                                                <span className="text-sm text-gray-300">
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
                                        buttonSize="glass text-white"
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
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="p-6 space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {article?.headline}
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {article?.summary}
                            </p>
                        </div>

                        <div className="divider" />

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            {article?.body}
                        </div>

                        {/* Engagement Section */}
                        <PostActions
                            likes={article?.reactions}
                            comments={article?.comments}
                            url={`/news/articles/${article?.slug}/comments`}
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
            )}
        </>
    )
}

export default ArticlePage
