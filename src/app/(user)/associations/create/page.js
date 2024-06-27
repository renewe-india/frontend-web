export const metadata = {
    title: 'Association Create',
}

const AssociationCreate = () => {
    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5">
                <div className="pb-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-2xl font-bold">
                                Check if your business is already listed
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <form
                        method="POST"
                        action="https://renewe.in/businesses/check"
                        className="flex flex-col gap-5 form-control">
                        <input type="hidden" name="_token" autoComplete="off" />
                        <div>
                            <label className="pt-0 label label-text font-semibold">
                                <span>Website</span>
                            </label>
                            <div className="flex">
                                <div className="rounded-l-lg flex items-center bg-base-200 border border-primary border-r-0 px-4">
                                    https://www.
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        placeholder="example.com"
                                        className="input input-primary w-full peer rounded-l-none"
                                        type="text"
                                        name="domain"
                                    />
                                </div>
                            </div>
                        </div>
                        <label className="hidden">
                            <input
                                name="is_business_have_domain"
                                x-model="is_business_have_domain"
                            />
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <button
                                type="submit"
                                className="btn normal-case btn-outline">
                                <span>Business does not have domain</span>
                            </button>
                            <button
                                type="submit"
                                className="btn normal-case btn-primary">
                                <span>Check Listings</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AssociationCreate
