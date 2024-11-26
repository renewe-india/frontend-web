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
                        {/* Like Button with Dropdown */}
                        <div className="dropdown dropdown-top dropdown-hover w-full ">
                            <button className="btn btn-ghost w-full flex justify-center items-center ">
                                <ThumbsUp size={24} stroke={2} />
                                Like
                            </button>
                            <ul className="dropdown-content menu p-2 shadow bg-base-300 rounded-box ">
                                <div className="flex gap-3">
                                    <button className="btn btn-ghost btn-square hover:scale-125 transition-transform">
                                        <Heart
                                            size={24}
                                            stroke={2}
                                            color="#c81438"
                                            weight="fill"
                                        />
                                    </button>
                                    <button className="btn btn-ghost btn-square hover:scale-125 transition-transform">
                                        <ThumbsUp
                                            size={24}
                                            stroke={2}
                                            color="#0673c6"
                                            weight="fill"
                                        />
                                    </button>
                                    <button className="btn btn-ghost btn-square hover:scale-125 transition-transform">
                                        <Smiley
                                            size={24}
                                            stroke={2}
                                            color="#f6911e"
                                            weight="fill"
                                        />
                                    </button>
                                    <button className="btn btn-ghost btn-square hover:scale-125 transition-transform">
                                        <Handshake
                                            size={24}
                                            stroke={2}
                                            color="#3a9d23"
                                            weight="fill"
                                        />
                                    </button>
                                    <button className="btn btn-ghost btn-square hover:scale-125 transition-transform">
                                        <Confetti
                                            size={24}
                                            stroke={2}
                                            color="#ffd700"
                                            weight="fill"
                                        />
                                    </button>
                                </div>
                            </ul>
                        </div>

                        {/* Comment Button */}
                        <button className="btn btn-ghost w-full flex justify-center items-center">
                            <ChatCenteredText size={24} stroke={2} /> Comment
                        </button>

                        {/* Repost Button */}
                        <button className="btn btn-ghost w-full flex justify-center items-center">
                            <ArrowsClockwise size={24} stroke={2} />
                            Repost
                        </button>

                        {/* Share Button */}
                        <button className="btn btn-ghost w-full flex justify-center items-center">
                            <PaperPlaneTilt size={24} stroke={2} />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsCard
