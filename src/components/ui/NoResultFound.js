import React from 'react'

function NoResultFound({ search, text }) {
    return (
        <div className="flex flex-col items-center justify-center  text-center">
            <img
                src="/notFound/result_not_found.svg"
                alt="No results found"
                width={300}
                height={300}
            />
            {search && (
                <>
                    <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                        Oops!... We couldn't find any match for "{search}".
                    </div>
                    <div className="mb-4 text-xl md:text-2xl ">
                        Please try another search.
                    </div>
                </>
            )}
            {text && (
                <div className="mb-4 text-2xl tracking-tight font-bold md:text-3xl ">
                    {text}
                </div>
            )}
        </div>
    )
}

export default NoResultFound
