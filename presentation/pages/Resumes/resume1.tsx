import Link from "next/link"

export default function SamiraResume() {
    return (
        <div className="min-h-screen bg-white p-6 md:p-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-0">Samira Alcaraz</h1>
                        <h2 className="text-xl md:text-2xl text-gray-700">Mechanical Engineer</h2>
                    </div>
                </header>

                {/* Contact Information */}
                <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-bold uppercase mb-4">CONTACT</h3>
                        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                            <div className="font-medium">Phone:</div>
                            <div>+123-456-7890</div>
                            <div className="font-medium">Email:</div>
                            <div>hello@reallygreatsite.com</div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 mt-8 md:mt-0">
                            <div className="font-medium">Address:</div>
                            <div>123 Anywhere St., Any City, ST 12345</div>
                            <div className="font-medium">Portfolio:</div>
                            <div>www.reallygreatsite.com</div>
                        </div>
                    </div>
                </section>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Work Experience */}
                <section className="mb-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                    <div>
                        <h3 className="text-lg font-bold uppercase">WORK EXPERIENCE</h3>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-lg">Research and Development Engineer | 2030-2035</h4>
                            <p className="text-gray-700 mb-4">The Innovation Lab</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    Spearheaded the development of advanced materials, resulting in a 15% increase in product efficiency
                                </li>
                                <li>
                                    Conducted comprehensive experiments and data analysis, leading to three published journal papers
                                </li>
                                <li>
                                    Collaborated with cross-functional teams to ideate and prototype innovative solutions for
                                    industry-specific challenges
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Mechanical Engineer | 2027-2030</h4>
                            <p className="text-gray-700 mb-4">Science and Tech Co.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    Assisted in optimizing mechanical systems for manufacturing processes, improving production speed by
                                    20%
                                </li>
                                <li>Drafted and implemented quality control procedures, reducing defects and inconsistencies by 30%</li>
                                <li>Supported the creation of detailed project reports and documentation for senior stakeholders</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Education */}
                <section className="mb-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                    <div>
                        <h3 className="text-lg font-bold uppercase">EDUCATION</h3>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-lg">North State University | 2025-2027</h4>
                            <p className="text-gray-700 mb-4">Master of Science in Mechanical Engineering</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>GPA: 3.8</li>
                                <li>Best Thesis Awardee</li>
                                <li>Recognition for Extended Research Paper</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">South City College | 2021-2025</h4>
                            <p className="text-gray-700 mb-4">Bachelor of Science in Mechanical Engineering</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>GPA: 3.8</li>
                                <li>Editor-in-Chief, SCC Newsletter</li>
                                <li>President, The Innovation Society</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Certificates */}
                <section className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                    <div>
                        <h3 className="text-lg font-bold uppercase">CERTIFICATES</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold">Project Management | 2027</h4>
                            <p className="text-gray-700">The Project Management Institute</p>
                        </div>
                        <div>
                            <h4 className="font-bold">System Optimization | 2028</h4>
                            <p className="text-gray-700">Scrum Learning Society</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Risk Management and Mitigation | 2028</h4>
                            <p className="text-gray-700">Internal Auditors Team</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Vendor Relations | 2030</h4>
                            <p className="text-gray-700">South City College</p>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="max-w-5xl mx-auto mt-12 text-center">
                <Link href="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </footer>
        </div>
    )
}
