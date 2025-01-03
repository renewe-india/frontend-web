'use client'

import {
    HeaderOutput,
    ParagraphOutput,
    TableOutput,
    ImageOutput,
    ListOutput,
} from 'editorjs-react-renderer'

const classes = {
    header: {
        h1: 'text-3xl font-bold',
        h2: 'text-2xl font-bold',
        h3: 'text-xl font-semibold',
        h4: 'text-lg font-semibold',
        h5: 'text-base font-semibold',
        h6: 'text-sm font-semibold',
    },
    paragraph: 'text-base sm:text-lg text-justify',
    list: {
        ol: {
            container:
                'list-decimal list-inside text-base sm:text-lg text-left ml-4',
            listItem: 'list-item-class',
        },
        ul: {
            container:
                'list-disc list-inside text-base sm:text-lg text-left ml-4',
            listItem: 'list-item-class',
        },
    },
}

function EditorJsRenderer({ content }) {
    return (
        <section>
            {content.blocks.map((block, index) => {
                switch (block.type) {
                    case 'header':
                        return (
                            <HeaderOutput
                                key={index}
                                data={block.data}
                                classNames={classes.header}
                            />
                        )
                    case 'paragraph':
                        return (
                            <ParagraphOutput
                                key={index}
                                data={block.data}
                                classNames={classes.paragraph}
                            />
                        )
                    case 'table':
                        return <TableOutput key={index} data={block.data} />
                    case 'image':
                        return <ImageOutput key={index} data={block.data} />
                    case 'list': {
                        const listType =
                            block.data.style === 'ordered' ? 'ol' : 'ul'
                        return (
                            <ListOutput
                                key={index}
                                data={block.data}
                                classNames={classes.list[listType]}
                            />
                        )
                    }
                    default:
                        return null
                }
            })}
        </section>
    )
}

export default EditorJsRenderer
