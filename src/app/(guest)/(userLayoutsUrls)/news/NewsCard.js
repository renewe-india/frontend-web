import {
    ArrowsClockwise,
    ChatCenteredText,
    Confetti,
    Handshake,
    Heart,
    PaperPlaneTilt,
    Smiley,
    ThumbsUp,
} from '@phosphor-icons/react'
import ArticleImage from './ArticleImage'

const NewsCard = ({ article, lastArticleElementRef }) => {
    return (
        <div
            ref={lastArticleElementRef}
            className="card bg-base-200 rounded-lg p-5">
            <div className="flex flex-col gap-2">
                <div className="ml-7 flex gap-2">
                    <ArticleImage src={article.image} />
                    <div className="px-2 flex flex-col gap-2">
                        <h2 className="text-xl font-bold">
                            {article.headline}
                        </h2>
                        <div>{article.summary}</div>
                    </div>
                </div>
                <div>
                    <div className="mx-7 flex justify-between border-b border-gray-200 dark:border-gray-600 pb-1">
                        <div className="text-xs text-gray-500">
                            {article.author} and {article.likes} others
                        </div>
                        <div className="text-xs text-gray-500 flex gap-4">
                            <div>{article.comments} comments</div>
                            <div>{article.reposts} reposts</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="dropdown normal-case w-full">
                            <div tabIndex={0} role="button">
                                <button
                                    type="button"
                                    className="btn normal-case w-full">
                                    <span className="block">
                                        <ThumbsUp size={24} stroke={2} />
                                    </span>
                                </button>
                            </div>
                            <ul
                                tabIndex={0}
                                className="btn dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-85">
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="btn normal-case btn-square btn-ghost">
                                        <span className="block">
                                            <Heart size={24} stroke={2} />
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn normal-case btn-square btn-ghost">
                                        <span className="block">
                                            <ThumbsUp size={24} stroke={2} />
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn normal-case btn-square btn-ghost">
                                        <span className="block">
                                            <Smiley size={24} stroke={2} />
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn normal-case btn-square btn-ghost">
                                        <span className="block">
                                            <Handshake size={24} stroke={2} />
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn normal-case btn-square btn-ghost">
                                        <span className="block">
                                            <Confetti size={24} stroke={2} />
                                        </span>
                                    </button>
                                </div>
                            </ul>
                        </div>
                        <button
                            type="button"
                            className="btn normal-case w-full btn-ghost">
                            <span className="block">
                                <ChatCenteredText size={24} stroke={2} />
                            </span>
                        </button>
                        <button
                            type="button"
                            className="btn normal-case w-full btn-ghost">
                            <span className="block">
                                <ArrowsClockwise size={24} stroke={2} />
                            </span>
                        </button>
                        <button
                            type="button"
                            className="btn normal-case w-full btn-ghost">
                            <span className="block">
                                <PaperPlaneTilt size={24} stroke={2} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsCard
