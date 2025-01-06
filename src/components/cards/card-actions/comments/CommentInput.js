'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Smiley, Image as ImageIcon, X } from '@phosphor-icons/react'
import Image from '@/components/Image'
import Avatar from '@/components/ui/AvatarImage'
import { cn, ConditionalRender } from '@/lib/utils'

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
        <div className="flex gap-4 mb-4 flex-wrap items-start">
            <Avatar
                avatarUrl={user?.avatar}
                alt={user?.author?.name}
                size="base"
                isVerified={user?.is_verified}
            />
            <div className="flex-1 relative w-full sm:w-auto">
                {/* Textarea with padding only when there is an image or user comment */}
                <textarea
                    value={userComment}
                    onChange={e => {
                        setUserComment(e.target.value)
                        e.target.style.height = 'auto'
                        e.target.style.height = `${e.target.scrollHeight}px`
                    }}
                    placeholder="Add a comment..."
                    className={cn('textarea textarea-bordered w-full', {
                        'pb-24': userImage,
                        'pb-10': userComment && !userImage,
                    })}
                    style={{ overflow: 'hidden' }}
                />

                {/* Emoji Picker and Image Upload Button */}
                <div
                    className={cn('absolute flex items-center gap-2', {
                        'left-4 bottom-4': userComment || userImage,
                        'right-2 top-4': !userComment && !userImage,
                    })}>
                    <ConditionalRender condition={!userImage}>
                        <label className="cursor-pointer">
                            <ImageIcon size={20} />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label>
                    </ConditionalRender>

                    <div className="relative">
                        {/* Image Preview and Removal */}
                        <ConditionalRender condition={userImage}>
                            <div className="absolute z-10 w-20 h-20 bottom-0 left-10">
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
                                    style={{
                                        transform: 'translate(50%, -50%)',
                                    }}>
                                    <X size={12} />
                                </button>
                            </div>
                        </ConditionalRender>
                        <Smiley
                            size={20}
                            className="cursor-pointer"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        />
                        <ConditionalRender condition={showEmojiPicker}>
                            <div className="relative">
                                <div
                                    ref={emojiPickerRef}
                                    className={cn('absolute z-10', {
                                        'top-12 -left-32':
                                            userComment || userImage,
                                        'top-12 -right-10':
                                            !userComment && !userImage,
                                    })}>
                                    <button
                                        className="z-20 btn btn-circle btn-xs absolute -top-2 -right-2 bg-base-100"
                                        onClick={() =>
                                            setShowEmojiPicker(false)
                                        }>
                                        <X size={12} weight="bold" />
                                    </button>
                                </div>
                            </div>
                        </ConditionalRender>
                    </div>
                </div>

                {/* Post Button */}
                <div
                    className={cn('absolute', {
                        'right-4 bottom-4': userComment || userImage,
                    })}>
                    <ConditionalRender condition={userComment || userImage}>
                        <button
                            onClick={handlePostComment}
                            className="btn btn-primary rounded-full btn-sm w-full sm:w-auto mt-4 sm:mt-0">
                            Comment
                        </button>
                    </ConditionalRender>
                </div>
            </div>
        </div>
    )
}

export default CommentInput
