import React from 'react'

function AddressCard() {
    return (
        <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl border border-primary">
            <div className="card-body">
                <div className="flex lg:flex-row flex-col justify-between">
                    <div className="flex flex-row lg:flex-col items-center md:items-start  justify-between">
                        <h2 className="card-title text-primary">Name</h2>

                        <div className="lg:mt-4">
                            <span className="badge badge-outline badge-primary mt-1 p-3">
                                Organization Type
                            </span>
                        </div>
                    </div>
                    <div className="card-actions mt-6 grid grid-cols-2 ">
                        <button className="btn btn-outline btn-success  btn-xs">
                            Default
                        </button>
                        <button className="btn btn-outline btn-secondary btn-xs">
                            Make Default
                        </button>
                        <button className="btn btn-outline btn-primary  btn-xs">
                            Public
                        </button>
                        <button className="btn btn-outline   btn-xs">
                            Private
                        </button>
                    </div>
                </div>
                <p className="text-muted mt-4">
                    132, My Street, Kingston, New York 12401
                </p>
                <div className="relative mt-8">
                    <div className="absolute bottom-0 right-0">
                        <button className="btn btn-primary">More ...</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressCard
