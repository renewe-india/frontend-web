import Image from '@/components/Image'

export default function Footer() {
    const ReneweLogo = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_LOGO}`
    return (
        <footer className="bg-base-200 py-10 text-base-content">
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row justify-between gap-8 mx-5 ">
                    {/* Renewe Logo or Brand Name */}
                    <div className="flex flex-col">
                        <a href="/" className="py-2 text-xl">
                            <Image
                                src={ReneweLogo}
                                alt="RenewE Logo"
                                className="h-5"
                            />
                        </a>
                        <p className="text-sm">Renewe © 2024</p>
                    </div>

                    {/* General Section */}
                    <div>
                        <h2 className="footer-title">General</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="link link-hover">
                                    Sign Up
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Press
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Developers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Browse Renewe Section */}
                    <div>
                        <h2 className="footer-title">Browse Renewe</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="link link-hover">
                                    Learning
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Jobs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Games
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Salary
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Mobile
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Top Companies Hub
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Business Solutions Section */}
                    <div>
                        <h2 className="footer-title">Business Solutions</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="link link-hover">
                                    Talent
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Marketing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Sales
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Learning
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Directories Section */}
                    <div>
                        <h2 className="footer-title">Directories</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="link link-hover">
                                    Members
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Jobs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Companies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Featured
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Learning
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Posts
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Articles
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    People Search
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="mt-10 border-t border-base-300 pt-6 text-sm">
                    <ul className="flex flex-wrap gap-4 justify-center">
                        <li>
                            <a href="/about" className="link link-hover">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="link link-hover">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="link link-hover">
                                Accessibility
                            </a>
                        </li>
                        <li>
                            <a href="#" className="link link-hover">
                                User Agreement
                            </a>
                        </li>
                        <li>
                            <a href="#" className="link link-hover">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="link link-hover">
                                Cookie Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="link link-hover">
                                Copyright Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="link link-hover">
                                Brand Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="link link-hover">
                                Community Guidelines
                            </a>
                        </li>
                        <li>
                            <a href="#" className="link link-hover">
                                Language
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
