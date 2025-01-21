import React from 'react'
export const metadata = {
    title: 'Contact Us',
    description:
        'We are here to help you. Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.',
}
function page() {
    return (
        <div className=" flex items-center justify-center min-h-screen relative py-16">
            <div className="bg-base-100 p-5">
                <div className="flex flex-col lg:flex-row justify-between gap-10">
                    <div className="lg:w-1/2">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold  ">
                            Contact Us
                        </h2>
                        <p className="mb-8 lg:mb-16 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
                            Got a technical issue? Want to send feedback about a
                            beta feature? Need details about our Business plan?
                            Let us know.
                        </p>
                        <h3 className="text-2xl font-bold mb-4">
                            Contact Details
                        </h3>
                        <p className="mb-2">
                            Address: Office # 201, Patilwada, Chinchani, Dahanu,
                            Palghar, Maharashtra, India, 401503
                        </p>
                        <p className="mb-2">Email: support@renewe.in</p>
                        <p className="mb-2">Helpline: +91 9766 675 475</p>
                    </div>
                    <div className="lg:w-1/2 lg:pl-8">
                        <form action="#" className="space-y-8">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium ">
                                    Your name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input input-bordered w-full"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium ">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input input-bordered w-full"
                                    placeholder="name@renewe.in"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="country"
                                    className="block mb-2 text-sm font-medium ">
                                    Your country
                                </label>
                                <select
                                    id="country"
                                    className="select select-bordered w-full"
                                    required>
                                    <option value="">
                                        Select your country
                                    </option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block mb-2 text-sm font-medium ">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="input input-bordered w-full"
                                    placeholder="Let us know how we can help you"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium ">
                                    Your message
                                </label>
                                <textarea
                                    id="message"
                                    rows="6"
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Leave a comment..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-full sm:w-auto">
                                Send message
                            </button>
                        </form>
                    </div>
                </div>{' '}
            </div>
        </div>
    )
}

export default page
