'use client'
import React, { useState } from 'react'

const CreatePostModal = ({ onSubmit }) => {
    const [postContent, setPostContent] = useState('')

    const handleChange = e => {
        setPostContent(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (postContent.trim() !== '') {
            onSubmit(postContent)
            setPostContent('') // Clear the input field
            document.getElementById('create-post-modal').close()
        }
    }

    return (
        <dialog id="create-post-modal" className="modal">
            <div className="modal-box">
                {/* Modal Close Button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>

                {/* Modal Title */}
                <h3 className="font-bold text-lg mb-4">Create a Post</h3>

                {/* Post Content Input */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        name="postContent"
                        value={postContent}
                        onChange={handleChange}
                        placeholder="What do you want to talk about?"
                        className="textarea w-full h-72 resize-none"
                        required
                    />

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                        {/* Submit Post Button */}
                        <button type="submit" className="btn btn-primary">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default CreatePostModal
