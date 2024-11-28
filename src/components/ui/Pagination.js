'use client'
import React from 'react'
const Pagination = ({ meta, onPageChange }) => {
    const { current_page, last_page, links } = meta

    const renderPageButtons = () => {
        if (last_page <= 5) {
            return links
                .filter(link => !isNaN(link.label))
                .map((link, index) => (
                    <button
                        key={index}
                        className={`join-item btn ${
                            link.active ? 'btn-active btn-primary' : ''
                        }`}
                        onClick={() => link.url && onPageChange(link.url)}
                        dangerouslySetInnerHTML={{
                            __html: link.label.toString(),
                        }}
                    />
                ))
        } else {
            const pageButtons = []

            for (let i = 1; i <= 2; i++) {
                const link = links.find(link => link.label == i)
                pageButtons.push(
                    <button
                        key={i}
                        className={`join-item btn ${
                            link.active ? 'btn-active btn-primary' : ''
                        }`}
                        onClick={() => link.url && onPageChange(link.url)}
                        dangerouslySetInnerHTML={{
                            __html: link.label.toString(),
                        }}
                    />,
                )
            }

            // Add ellipsis if there are more than 6 pages
            if (last_page > 6) {
                pageButtons.push(
                    <button
                        key="ellipsis"
                        className="join-item btn btn-disabled">
                        ...
                    </button>,
                )
            }

            // Last two pages
            for (let i = last_page - 1; i <= last_page; i++) {
                const link = links.find(link => link.label == i)
                pageButtons.push(
                    <button
                        key={i}
                        className={`join-item btn ${
                            link.active ? 'btn-active btn-primary' : ''
                        }`}
                        onClick={() => link.url && onPageChange(link.url)}
                        dangerouslySetInnerHTML={{
                            __html: link.label.toString(),
                        }}
                    />,
                )
            }

            return pageButtons
        }
    }

    return (
        <div className="flex justify-center my-4">
            <div className="join ">
                {/* Previous Button */}
                <button
                    className={`join-item btn ${
                        current_page === 1 ? 'btn-disabled' : ''
                    }`}
                    onClick={() =>
                        current_page > 1 && onPageChange(links[0].url)
                    }>
                    <span
                        className="hidden sm:inline"
                        dangerouslySetInnerHTML={{ __html: links[0].label }}
                    />
                    <span className="sm:hidden">&laquo;</span>
                </button>

                {/* Page Buttons */}
                {renderPageButtons()}

                {/* Next Button */}
                <button
                    className={`join-item btn ${
                        current_page === last_page ? 'btn-disabled' : ''
                    }`}
                    onClick={() =>
                        current_page < last_page &&
                        onPageChange(links[links.length - 1].url)
                    }>
                    <span
                        className="hidden sm:inline"
                        dangerouslySetInnerHTML={{
                            __html: links[links.length - 1].label,
                        }}
                    />
                    <span className="sm:hidden">&raquo;</span>
                </button>
            </div>
        </div>
    )
}

export default Pagination
