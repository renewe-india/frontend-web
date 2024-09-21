import React from 'react'

function StockAvailable() {
    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5 mt-2">
                <div className="text-xl font-bold mx-2 my-3">
                    Available stock
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card card-compact bg-base-100 w-auto shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                alt="Shoes"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>
                                If a dog chews shoes whose shoes does he choose?
                            </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-compact bg-base-100 w-auto shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                alt="Shoes"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>
                                If a dog chews shoes whose shoes does he choose?
                            </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StockAvailable
