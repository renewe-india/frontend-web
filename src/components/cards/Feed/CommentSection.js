import {
    DotsThree,
    EyeSlash,
    Flag,
    Image,
    Smiley,
    ThumbsUp,
    X,
} from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })
const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [userComment, setUserComment] = useState('')
    const [userImage, setUserImage] = useState(null)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handleEmojiClick = emojiObject => {
        setUserComment(prev => prev + emojiObject.emoji)
    }

    // Function to simulate API call to fetch comments
    const fetchComments = () => {
        setLoading(true)

        // Simulating API call with setTimeout
        setTimeout(() => {
            setComments([
                {
                    id: 1,
                    userName: 'Kivani Kotecha',
                    userImage: 'https://via.placeholder.com/40',
                    content: `“Hard work leaves no place for self doubt.” 🥇 💯`,
                    contentImage: 'https://via.placeholder.com/200', // Example content image
                    userTitle:
                        'Experienced Data Analyst | Transforming Raw Data into Actionable Insights',
                    postTime: '29m',
                },
                {
                    id: 2,
                    userName: 'Jane Smith',
                    userImage: 'https://via.placeholder.com/40',
                    content: 'Thanks for sharing this post!',
                    contentImage: null,
                    userTitle: 'Marketing Specialist | Creative Thinker',
                    postTime: '1h',
                },
            ])
            setLoading(false)
        }, 1000)
    }

    // Handle posting a new comment
    const handlePostComment = () => {
        if (userComment.trim() === '') return

        const newComment = {
            id: comments.length + 1,
            userName: 'You',
            userImage: 'https://via.placeholder.com/40',
            content: userComment,
            contentImage: userImage, // Add uploaded image to the comment
            userTitle: 'Active User',
            postTime: 'Just now',
        }

        setComments(prevComments => [newComment, ...prevComments])
        setUserComment('')
        setUserImage(null)
    }

    // Function to handle image upload
    const handleImageUpload = event => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setUserImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    // Function to remove the uploaded image
    const removeImage = () => {
        setUserImage(null)
    }

    // Fetch comments when the component mounts
    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div className="bg-inherit rounded-lg shadow p-4 m-2">
            {/* User Input Section */}
            <div className="flex gap-4 mb-4 flex-wrap">
                <img
                    src="https://via.placeholder.com/40"
                    alt="User"
                    className="w-10 h-10 rounded-full items-start"
                />
                <div className="flex-1 relative items-center w-full sm:w-auto">
                    <input
                        type="text"
                        value={userComment}
                        onChange={e => setUserComment(e.target.value)}
                        placeholder="Add a comment..."
                        className={`input input-bordered w-full ${
                            userImage
                                ? 'pt-5 pb-40'
                                : userComment
                                ? 'pt-5 pb-16'
                                : ''
                        }`}
                    />
                    <div
                        className={`absolute flex items-center gap-2 ${
                            userComment || userImage
                                ? 'left-4 bottom-4'
                                : 'right-2 top-4'
                        }`}>
                        {!userImage && (
                            <label className="cursor-pointer">
                                <Image size={20} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        )}
                        <div className="relative">
                            <Smiley
                                size={20}
                                className="cursor-pointer"
                                onClick={() =>
                                    setShowEmojiPicker(!showEmojiPicker)
                                }
                            />
                            {showEmojiPicker && (
                                <div className="relative">
                                    <div
                                        className={`absolute z-10 ${
                                            userComment || userImage
                                                ? 'bottom-12 -left-20'
                                                : 'bottom-12 right-0'
                                        }`}>
                                        <EmojiPicker
                                            onEmojiClick={handleEmojiClick}
                                        />
                                        <button
                                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                                            onClick={() =>
                                                setShowEmojiPicker(false)
                                            }
                                            style={{
                                                transform:
                                                    'translate(50%, -50%)',
                                            }}>
                                            <X size={12} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`absolute ${
                            userComment || userImage ? 'right-4 bottom-4' : ''
                        }`}>
                        {(userComment || userImage) && (
                            <button
                                onClick={handlePostComment}
                                className="btn btn-primary btn-sm w-full sm:w-auto mt-4 sm:mt-0">
                                Post
                            </button>
                        )}
                    </div>
                    {/* Image Preview */}
                    {userImage && (
                        <div className="absolute left-4 top-8 mt-2 w-20 h-20">
                            <img
                                src={userImage}
                                alt="Image Preview"
                                className="w-full h-full object-cover rounded-md"
                            />
                            <button
                                className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md"
                                onClick={removeImage}
                                style={{
                                    transform: 'translate(50%, -50%)',
                                }}>
                                <X size={12} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Dynamic Comments List */}
            <div>
                {loading ? (
                    <p>Loading comments...</p>
                ) : comments.length > 0 ? (
                    comments.map(comment => (
                        <div
                            key={comment.id}
                            className="flex gap-4 py-4 border-b border-gray-200">
                            <img
                                src={comment.userImage}
                                alt={comment.userName}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold">
                                            {comment.userName}
                                        </h4>
                                        <span className="text-sm text-gray-500">
                                            {comment.userTitle}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {comment.postTime}
                                    </div>
                                </div>
                                <p className="mt-2">{comment.content}</p>
                                {/* Display attached content image if available */}
                                {comment.contentImage && (
                                    <img
                                        src={comment.contentImage}
                                        alt="Content"
                                        className="mt-2 rounded-lg max-w-full h-auto" // Changed max-w-xs to max-w-full
                                    />
                                )}
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <button className="flex items-center gap-1">
                                        <ThumbsUp size={16} />
                                        Like
                                    </button>
                                    <button className="flex items-center gap-1">
                                        | Reply
                                    </button>
                                </div>
                            </div>
                            <div className="dropdown dropdown-end">
                                <button
                                    tabIndex={0}
                                    className="btn btn-ghost btn-sm">
                                    <DotsThree size={20} />
                                </button>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <button className="flex items-center gap-2">
                                            <EyeSlash size={24} />
                                            <span>
                                                I don't want to see this
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="flex items-center gap-2">
                                            <Flag size={24} />
                                            <span>Report</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    )
}

export default CommentSection
