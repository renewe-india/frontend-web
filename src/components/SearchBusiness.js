import React, { useState } from 'react'
import ErrorDisplay from '@/components/ErrorDisplay'

function SearchBusiness() {
    const [errors, setErrors] = useState([])
    return (
        <>
            <div>
                <label className="pt-0 label label-text font-semibold">
                    <span>Domain</span>
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
                            // value={formData.domain}
                            // onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <ErrorDisplay errors={errors} />
            {/* <button
                type="submit"
                className="btn normal-case btn-primary"
                disabled={isSubmitting}>
                <span>
                    {isSubmitting
                        ? 'Creating a New Business...'
                        : 'Create a New Business'}
                </span>
            </button> */}
        </>
    )
}

export default SearchBusiness
