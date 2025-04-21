import Image from 'next/image'
import Link from 'next/link'

export default function StefanoResume() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-gray-800 text-white relative">
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 relative mb-4 md:mb-0 md:mr-8">
                        <Image
                            src="/images/stefano-profile.png"
                            alt="Profile silhouette"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-2">STEFANO ACCORSI</h1>
                        <h2 className="text-xl md:text-2xl font-light tracking-wide">CONTENT STRATEGIST</h2>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <section>
                        <h3 className="text-xl font-bold mb-4">INTRODUCTION</h3>
                        <p className="mb-8">
                            Creative and determined marketing content strategist with five
                            years of experience in developing and executing content
                            strategies that drive engagement and growth.
                        </p>

                        <h3 className="text-xl font-bold mb-4">WORK EXPERIENCE</h3>
                        <div className="mb-6">
                            <div className="mb-2">
                                <h4 className="font-bold">Content Strategist | 2037-2040</h4>
                                <p>The Brand Marketing Group</p>
                            </div>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Created and executed data-driven content projects, achieving a 30% increase in customer engagement rates</li>
                                <li>Increased lead generation by 25% within a year through the development of trend-based marketing materials</li>
                                <li>Implemented targeted content strategies and optimized content distribution, resulting in a 45% increase in website traffic</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <div className="mb-2">
                                <h4 className="font-bold">Marketing Specialist | 2035-2037</h4>
                                <p>Marketing Solutions Agency</p>
                            </div>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Performed market research and data analysis, which resulted in a 15% increase in customer retention rates and a 10% rise in customer satisfaction scores</li>
                                <li>Contributed to a 30% increase in lead generation through well-developed and executed marketing campaigns</li>
                                <li>Developed a digital marketing campaign for a new product, which increased conversion rates by 5%</li>
                            </ul>
                        </div>
                    </section>

                    {/* Right Column */}
                    <section>
                        <h3 className="text-xl font-bold mb-4">CONTACT</h3>
                        <div className="mb-8">
                            <p><span className="font-bold">Phone:</span> +123-456-7890</p>
                            <p><span className="font-bold">Email:</span> hello@reallygreatsite.com</p>
                            <p><span className="font-bold">Address:</span> 123 Anywhere St., Any City, ST 12345</p>
                            <p><span className="font-bold">LinkedIn:</span> www.reallygreatsite.com</p>
                        </div>

                        <h3 className="text-xl font-bold mb-4">AWARDS AND CERTIFICATION</h3>
                        <div className="mb-4">
                            <h4 className="font-bold">Employee Excellence (2036)</h4>
                            <p>Marketing Solutions Agency</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="font-bold">Certificate of Completion, Marketing Strategy Course (2035)</h4>
                            <p>Marketing Experts Network</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="font-bold">Promising Writer Award (2034)</h4>
                            <p>Liberty State University Newsletter Editorial Staff</p>
                        </div>
                        <div className="mb-8">
                            <h4 className="font-bold">Certificate of Completion, Writing for Marketing (2034)</h4>
                            <p>Liberty State University Department of Marketing</p>
                        </div>

                        <h3 className="text-xl font-bold mb-4">EDUCATION</h3>
                        <div className="mb-4">
                            <h4 className="font-bold">Liberty State University | 2031-2035</h4>
                            <p>Bachelor of Arts in Marketing Communication</p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>GPA 3.9</li>
                                <li>President, University Marketing Aspirants</li>
                                <li>Contributing Writer, University Newsletter</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="container mx-auto px-4 py-4 text-center">
                <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
            </footer>
        </div>
    )
}
