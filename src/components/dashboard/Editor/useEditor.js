import { useEffect, useRef } from 'react'

const useEditor = initialContent => {
    const editorRef = useRef(null)

    const initializeEditor = async () => {
        const { default: EditorJS } = await import('@editorjs/editorjs')
        const { default: Header } = await import('@editorjs/header')
        const { default: List } = await import('@editorjs/list')
        const { default: Table } = await import('@editorjs/table')
        const { default: LinkTool } = await import('@editorjs/link')
        const { default: SimpleImage } = await import('@editorjs/simple-image')
        const { default: Marker } = await import('@editorjs/marker')

        let parsedContent
        try {
            parsedContent = initialContent
                ? JSON.parse(initialContent)
                : undefined
        } catch (e) {
            parsedContent = undefined
        }

        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: Header,
                    list: List,
                    table: Table,
                    linkTool: LinkTool,
                    image: SimpleImage,
                    Marker: {
                        class: Marker,
                        shortcut: 'SHIFT+M',
                    },
                },
                data: parsedContent,
            })
            editorRef.current = editor
        }
    }

    useEffect(() => {
        const init = async () => {
            if (document.getElementById('editorjs')) {
                await initializeEditor()
            } else {
                const intervalId = setInterval(() => {
                    if (document.getElementById('editorjs')) {
                        clearInterval(intervalId)
                        initializeEditor()
                    }
                }, 100)
            }
        }

        if (typeof window !== 'undefined') {
            init()
            return () => {
                if (editorRef.current) {
                    editorRef.current.isReady.then(() => {
                        editorRef.current.destroy()
                        editorRef.current = null
                    })
                }
            }
        }
    }, [initialContent])

    const saveContent = async () => {
        if (editorRef.current) {
            return await editorRef.current.save()
        }
    }

    return { saveContent }
}

export default useEditor
