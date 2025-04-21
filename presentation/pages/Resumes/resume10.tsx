import Link from "next/link"

export default function CatrianaResume() {
    return (
        <div className="min-h-screen bg-white p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-5xl font-bold text-blue-600 mb-2">Catriana Janssen</h1>
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">SOFTWARE DEVELOPER</h2>

                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-xl font-bold text-blue-600 mb-4">INTRODUCTION</h3>
                            <p className="text-gray-700 max-w-2xl">
                                I am a software developer and systems architect with a background in designing, coding, and testing
                                intricate systems. My expertise lies in C#, Java, and Ruby programming languages.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-blue-600 mb-4">CONTACT INFO</h3>
                            <div className="space-y-1">
                                <p>
                                    <span className="font-medium">Email:</span> hello@reallygreatsite.com
                                </p>
                                <p>
                                    <span className="font-medium">Portfolio:</span> www.reallygreatsite.com
                                </p>
                                <p>
                                    <span className="font-medium">LinkedIn:</span> www.reallygreatsite.com
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Work Experience */}
                <section className="mb-12">
                    <h3 className="text-xl font-bold text-blue-600 mb-6">WORK EXPERIENCE</h3>
                    <div className="space-y-8">
                        <div>
                            <div className="mb-2">
                                <h4 className="text-lg font-bold">Senior Software Engineer</h4>
                                <p className="text-gray-600">The Systems Design Group | Jan 2034 - June 2038</p>
                            </div>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    Led a team of 10 engineers in developing a new architecture that increased system performance by 40%
                                    and reduced server costs by 20%
                                </li>
                                <li>
                                    Successfully implemented automated testing protocols, reducing bug-related incidents by 40% within the
                                    first six months
                                </li>
                            </ul>
                        </div>

                        <div>
                            <div className="mb-2">
                                <h4 className="text-lg font-bold">Software Developer</h4>
                                <p className="text-gray-600">The Systems Design Inc. | Sept 2030 - Dec 2033</p>
                            </div>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Improved application performance by 30% through optimization of database queries</li>
                                <li>
                                    Successfully collaborated with a team of 5 developers to complete a major project, delivering the
                                    final product 1 week ahead of the 6-month deadline and under budget by 15%
                                </li>
                                <li>
                                    Implemented automated testing procedures that reduced bug reports by 40%, increasing overall software
                                    reliability and customer satisfaction
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Two Column Layout for Education and Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Education */}
                    <section>
                        <h3 className="text-xl font-bold text-blue-600 mb-6">EDUCATION</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-bold">North State University</h4>
                                <p>Masters of Science | May 2030 - May 2032</p>
                                <p>Masters in Computer Science</p>
                                <p>GPA: 3.35</p>
                                <p>Most Impactful Thesis Award</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold">City College</h4>
                                <p>Bachelor of Science | Jun 2026 - Jun 2030</p>
                                <p>BS Computer Science</p>
                                <p>GPA: 3.75</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Specialization in Enterprise Systems</li>
                                    <li>Vice President and Lead Violinist, City College Classical Orchestra</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Skills and Additional Info */}
                    <div className="space-y-8">
                        <section>
                            <h3 className="text-xl font-bold text-blue-600 mb-6">SKILLS</h3>
                            <ul className="grid grid-cols-1 gap-2">
                                <li>System Analysis</li>
                                <li>User Research</li>
                                <li>Machine Learning</li>
                                <li>Agile Methodology</li>
                                <li>Database Modelling</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-blue-600 mb-6">ADDITIONAL INFORMATION</h3>
                            <div>
                                <p className="font-bold">Akio Tomika</p>
                                <p>Email: hello@reallygreatsite.com</p>
                                <p>Phone: (123) 456-7890</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <footer className="max-w-4xl mx-auto text-center">
                <Link href="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </footer>
        </div>
    )
}
