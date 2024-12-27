'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Smiley, Image as ImageIcon, X } from '@phosphor-icons/react'
import Image from '@/components/Image'

const CommentInput = ({
    user,
    userComment,
    setUserComment,
    userImage,
    setUserImage,
    handlePostComment,
}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const emojiPickerRef = useRef(null)

    useEffect(() => {
        if (showEmojiPicker) {
            import('emoji-picker-element').then(() => {
                const picker = document.createElement('emoji-picker')
                emojiPickerRef.current?.appendChild(picker)

                picker.addEventListener('emoji-click', event => {
                    setUserComment(prev => prev + event.detail.unicode)
                })
            })
        } else {
            if (emojiPickerRef.current) {
                emojiPickerRef.current.innerHTML = ''
            }
        }
    }, [showEmojiPicker, setUserComment])

    const handleImageUpload = event => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setUserImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setUserImage(null)
    }

    return (
        <div className="flex gap-4 mb-4 flex-wrap">
            <Image
                data={user.avatar}
                alt="User "
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
                            <ImageIcon size={20} />
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
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        />
                        {showEmojiPicker && (
                            <div className="relative">
                                <div
                                    ref={emojiPickerRef}
                                    className={`absolute z-10 ${
                                        userComment || userImage
                                            ? 'bottom-12 -left-20'
                                            : 'bottom-12 right-0'
                                    }`}>
                                    <button
                                        className="z-20 btn btn-circle btn-xs absolute -top-2 -right-2 bg-base-100"
                                        onClick={() =>
                                            setShowEmojiPicker(false)
                                        }>
                                        <X size={12} weight="bold" />
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
                {userImage && (
                    <div className="absolute left-4 top-8 mt-2 w-20 h-20">
                        <Image
                            src={userImage}
                            alt="Image Preview"
                            width={80}
                            height={80}
                            className="object-cover rounded-md"
                        />
                        <button
                            className="btn btn-circle btn-xs absolute top-0 right-0 bg-base-100"
                            onClick={removeImage}
                            style={{ transform: 'translate(50%, -50%)' }}>
                            <X size={12} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentInput
