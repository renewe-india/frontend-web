import { Image } from '@phosphor-icons/react/dist/ssr'
import React, { useState, useEffect } from 'react'

function Input() {
    const [progress, setProgress] = useState(0)
    const [cropper, setCropper] = useState(null)
    const [justCropped, setJustCropped] = useState(false)
    const [fileChanged, setFileChanged] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageCrop, setImageCrop] = useState(null)
    const [originalImageUrl, setOriginalImageUrl] = useState(null)
    const [cropAfterChange, setCropAfterChange] = useState(false)
    const [file, setFile] = useState(null)

    const processing = progress > 0 && progress < 100

    useEffect(() => {
        if (progress === 100 && cropAfterChange && !justCropped) {
            crop()
        }
    }, [progress, cropAfterChange, justCropped])

    const init = () => {
        setImagePreview(document.querySelector('img'))
        setImageCrop(document.querySelector('img'))
        setOriginalImageUrl(imagePreview.src)
    }

    const close = () => {
        document.getElementById('maryCrop').close()
        cropper.destroy()
    }

    const change = () => {
        if (processing) return
        document.getElementById('file').click()
    }

    const refreshImage = () => {
        setProgress(1)
        setJustCropped(false)
        if (imagePreview.src) {
            imagePreview.src = URL.createObjectURL(file.files[0])
            imageCrop.src = imagePreview.src
        }
    }

    const crop = () => {
        document.getElementById('maryCrop').showModal()
        cropper.destroy()
        setCropper(
            new Cropper(imageCrop, {
                autoCropArea: 1,
                viewMode: 1,
                dragMode: 'move',
            }),
        )
    }

    const revert = () => {
        window.Livewire.$removeUpload(
            '',
            file.split('livewire-file:').pop(),
            () => {
                imagePreview.src = originalImageUrl
            },
        )
    }

    const save = async () => {
        document.getElementById('maryCrop').close()
        setProgress(1)
        setJustCropped(true)
        imagePreview.src = cropper.getCroppedCanvas().toDataURL()
        imageCrop.src = imagePreview.src
        cropper.getCroppedCanvas().toBlob(blob => {
            window.Livewire.find('yLSXlPxO0Gl1bjUxRcKF').upload(
                '',
                blob,
                () => {},
                () => {},
                event => {
                    setProgress(event.detail.progress)
                },
            )
        })
    }

    return (
        <div className="card bg-base-100 rounded-lg p-5">
            <div className="pb-5">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-bold">
                            Post something Energetic
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <input
                                id="maryf767aaaf95192ceb3fc430678a29f954"
                                type="file"
                                ref={file => setFile(file)}
                                onChange={refreshImage}
                                accept="image/png, image/jpeg"
                                className="file-input file-input-bordered file-input-primary hidden"
                            />
                            <button
                                type="button"
                                title="More"
                                className="btn normal-case btn-square btn-ghost btn-sm">
                                <Image size={24} />
                            </button>
                            <div
                                className="radial-progress text-success absolute top-5 left-5 bg-neutral hidden"
                                role="progressbar"
                                style={{
                                    '--value': progress,
                                    '--size': '1.5rem',
                                    '--thickness': '4px',
                                }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <dialog
                className="modal backdrop-blur-sm"
                id="maryCropmaryf767aaaf95192ceb3fc430678a29f954">
                <div className="modal-box">
                    <div id="crop-image" className="mb-10 mb-5">
                        <div className="flex flex-wrap gap-5 justify-between items-center">
                            <div>
                                <div className="text-2xl font-extrabold">
                                    Crop image
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-3 grow order-last sm:order-none">
                                <div className="w-full lg:w-auto">
                                    <button
                                        type="button"
                                        onClick={close}
                                        className="btn normal-case">
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={save}
                                        disabled={processing}
                                        className="btn normal-case btn-primary">
                                        Crop
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className="my-5" />
                        <img src="#" />
                        <hr className="mt-5" />
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Input
