export default function Footer() {
    return (
        <div className="w-full sm:max-w-md mx-auto">
            <footer className="footer items-center p-4 text-base-content">
                <div className="flex flex-wrap gap-4 justify-self-end">
                    <div className="items-center flex flex-wrap">
                        <p>Renewe © 2024</p>
                    </div>
                    <a href="/about" className="link link-hover">
                        About
                    </a>
                    <a href="/contact" className="link link-hover">
                        Contact Us
                    </a>
                    <a href="#" className="link link-hover">
                        Accessibility
                    </a>
                    <a href="#" className="link link-hover">
                        Help Center
                    </a>
                    <a href="#" className="link link-hover">
                        Privacy & Terms
                    </a>

                    <a href="#" className="link link-hover">
                        More
                    </a>
                </div>
            </footer>
        </div>
    )
}
